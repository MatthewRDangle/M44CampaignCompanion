"use strict"; // Execute JavaScript file in strict mode.

/*
 ** Title: Map.
 ** Description: Creates the game map.
 */
class Map {
	
	/*
	 ** Title: Constructor
	 ** Description: Initilizes the Grid.
	 */
    constructor(scene, emitter, width, height, startX, startY) {
    	
    	// Game Data
    	this.scene = scene;
    	this.container = scene.add.container(0, 0);
    	this.emitter = emitter;

    	// Polygon Data.
    	this.width = width;
    	this.height = height;
    	this.tileHeight = 75;
    	this.startX = startX;
    	this.startY = startY;
    	
    	// Map Info.
    	this.tiles = [];
    	this.draw(); // Draw all tiles for the map. They will be stored in the tiles array.
    }
    
	/*
	 ** Title: Draw
	 ** Description: Creates the grid and stores them into a container inside the scene.
	 */
    draw() {
    	let map = this;
    	this.container.depth = 1;

    	// Scale The Map with the Mouse Wheel.
    	this.scene.input.on('wheel', function(pointer, gameObjects, deltaX, deltaY, deltaZ) {
    		if (deltaY > 0)
    			this.container.scale -= 0.05;
    		else
    			this.container.scale += 0.05;
    	}, this);
    	
    	// Construct a draggable map.
    	let dragZone = this.scene.add.rectangle(20, 40, window.innerWidth - 590, window.innerHeight - 140, 0x000000);
    	dragZone.setOrigin(0,0);
    	dragZone.setInteractive({useHandCursor: true});
    	this.scene.input.setDraggable(dragZone);
    	dragZone.on('dragstart', function(pointer) {
    		this.container.setData('x_start', this.container.x);
    		this.container.setData('y_start', this.container.y);
    	}, this);
    	dragZone.on('drag', function(pointer, dragX, dragY) {
        	let trueDragX = dragX - dragZone.x;
        	let trueDragY = dragY - dragZone.y;
      		this.container.x = this.container.getData('x_start') + trueDragX;
    		this.container.y = this.container.getData('y_start') + trueDragY;
    	}, this);
    	
    	// Set Mode Change.
    	this.scene.data.list['mode'] = 'View';
    	let modeText = this.scene.add.text(window.innerWidth - 670, 50, 'Mode: '+ this.scene.data.list['mode'], { font: '16px Arial', fill: '#FFFFFF' });
    	modeText.depth = 2;
    	this.emitter.on('changeMode', function() {
    		modeText.setText('Mode: '+ this.scene.data.list['mode']);
    	}, this);
    	this.scene.input.keyboard.on('keydown', function() {
        	if (this.scene.data.list['mode']) {
				if (this.scene.data.list['mode'] === 'View') { 
					this.scene.data.list['mode'] = 'Add'; 
				}
				else if (this.scene.data.list['mode'] === 'Add') { 
					this.scene.data.list['mode'] = 'View'; 
				}
				else if (this.scene.data.list['mode'] === 'Move') { 
					this.scene.data.list['mode'] = 'View'; 
				}
			}
    		map.emitter.emit('changeMode');
    	});

    	// Construct a new tile for each width count.
    	let hexCoords = getHexCoords(this.tileHeight);
    	for (let x = 0; x <= this.width - 1; x++) {
    		
    		// Count a new tile for each height count.
    		for (let y = 0; y <= this.height-1; y++) {
    			let hexX = x * this.tileHeight - (x*(this.tileHeight/9));
    			let hexY = y * this.tileHeight + (y*2);
    			if (x % 2 === 1) {
    				hexY+= this.tileHeight / 2;
    			}
    			
    			// Create a hex shape and add it to the container to render.
    			let tile = new Tile(this.scene, this.container, this.emitter, hexX+this.startX, hexY+this.startY, hexCoords);
    			this.tiles.push(tile);
    		}
    	}
    	
        function getHexCoords(height) {
        	
        	//http://csharphelper.com/blog/2015/10/draw-a-hexagonal-grid-in-c/
        	let width = 4 * (height / 2 / Math.sqrt(3));
        	let y = height / 2;
        	let hexCoords = [
        		0, y, 
        		width * 0.25, y - height / 2, 
        		width * 0.75, y - height / 2, 
        		width, y,  
        		width * 0.75, y + height / 2,  
        		width * 0.25, y + height / 2
        	];
        	return hexCoords;
        }
    }
}