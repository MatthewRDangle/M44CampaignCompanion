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
    constructor(scene, width, height, startX, startY) {
    	
    	// Game Data
    	this.scene = scene;
    	this.container = scene.add.container(0, 0);
    	
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

    	// Scale The Map with the Mouse Wheel.
    	this.scene.input.on('wheel', function(pointer, gameObjects, deltaX, deltaY, deltaZ) {
    		if (deltaY > 0)
    			this.container.scale -= 0.05;
    		else
    			this.container.scale += 0.05;
    	}, this);
    	
    	// Set Mode Change.
    	this.scene.data.list['mode'] = 'View';
    	let modeText = this.scene.add.text(window.innerWidth - 670, 50, 'Mode: '+ this.scene.data.list['mode'], { font: '16px Arial', fill: '#FFFFFF' });
    	this.scene.input.keyboard.on('keydown', function() {
    		if (this.scene.data.list['mode']) {
    			if (this.scene.data.list['mode'] === 'View') { 
    				this.scene.data.list['mode'] = 'Add'; 
    				modeText.setText('Mode: '+ this.scene.data.list['mode']);
    			}
    			else if (this.scene.data.list['mode'] === 'Add') { 
    				this.scene.data.list['mode'] = 'View'; 
    				modeText.setText('Mode: '+ this.scene.data.list['mode']);
    			}
    			else if (this.scene.data.list['mode'] === 'Move') { 
    				this.scene.data.list['mode'] = 'View'; 
    				modeText.setText('Mode: '+ this.scene.data.list['mode']);
    			}
    		}	
    	});
    	
    	// Construct a draggable map.
    	let dragZone = this.scene.add.zone(20, 100, window.innerWidth - 590, window.innerHeight - 140);
    	dragZone.setOrigin(0,0);
    	dragZone.setInteractive();
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
    			let tile = new Tile(this.scene, this.container, hexX+this.startX, hexY+this.startY, hexCoords);
    			
    	    	// Move the map with a mouse drag.
//    	    	tile.polygon.setInteractive();
//    	    	this.scene.input.setDraggable(tile.polygon);
//    	    	tile.polygon.on('dragstart', function (pointer) {
//    	    		this.container.setData('x_start', this.container.x);
//    	    		this.container.setData('y_start', this.container.y);
//    	    	}, this);
//    	        tile.polygon.on('drag', function (pointer, dragX, dragY) {
//    	        	let trueDragX = dragX - tile.polygon.x;
//    	        	let trueDragY = dragY - tile.polygon.y;
//    	      		this.container.x = this.container.getData('x_start') + trueDragX;
//    	    		this.container.y = this.container.getData('y_start') + trueDragY;
//    	        }, this);
    	        
    			tile.polygon.on('pointerdown', function(event) {
    				let mouseClick = event.event.which; // 1, 2 or 3 for a mouse click.
    				
    				// On left click, enter movement mode for a unit.
    				if (mouseClick === 1 && this.scene.data.list['mode'] === 'View') {
    					
    					// Check if unit exists. If it does, enter movement mode. Otherwise, do nothing.
    					if ( tile.hasUnit() ) {
    						this.scene.data.list['mode'] = 'Move';
    	    				modeText.setText('Mode: '+ this.scene.data.list['mode']);
    						this.scene.data.list['selectedHex'] = tile;
    					}
    				}
    				
    				// On left click while in movement mode, move the unit where it needs to go.
    				else if (mouseClick === 1 && this.scene.data.list['mode'] === 'Move') {
    		
    					// Move unit to the new hex if a unit does not exist there.
    					if ( !tile.hasUnit() ) {
    						
    						// Transfer the unit to the new tile.
    						let old_tile = this.scene.data.list['selectedHex'];
    						old_tile.transferUnit(tile);
    						
    						// Reset mode, deselect hex, and change unit to be inside new hex.
    						this.scene.data.list['mode'] = 'View';
    	    				modeText.setText('Mode: '+ this.scene.data.list['mode']);
    						this.scene.data.list['selectedHex'] = false;
    					}
    				}

    				// On right click, add or remove units.
    				else if (mouseClick === 3 && this.scene.data.list['mode'] === 'Add') {
    					
    					// If the box doesn't have a unit, add it.
    					if ( !tile.hasUnit() ) {
    						tile.addUnit();
    					}
    					
    					// If it has a unit, remove it.
    					else {
    						tile.removeUnit();
    					}	
    				}
    			}, this);
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