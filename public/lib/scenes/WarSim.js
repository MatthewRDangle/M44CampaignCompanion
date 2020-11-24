"use strict"; // Execute JavaScript file in strict mode.

class WarSim extends Phaser.Scene {
	
    constructor() {
        super('WarSim');
    }

    preload() {}
    create() {
    	
    	// Create a grid container to render the grid.
    	this.gridContainer = this.add.container(75,75);
    	this.drawHexGrid(14,8,75,5,5);
    	
    	// Set Mode Change.
    	this.data.list['mode'] = 'View';
    	this.input.keyboard.on('keydown', function(event) {
    		if (this.scene.data.list['mode']) {
    			if (this.scene.data.list['mode'] === 'View') { this.scene.data.list['mode'] = 'Add'; }
    			else if (this.scene.data.list['mode'] === 'Add') { this.scene.data.list['mode'] = 'View'; }
    			else if (this.scene.data.list['mode'] === 'Move') { this.scene.data.list['mode'] = 'View'; }
    		}	
    	});
    }
    update() {}

    
    drawHexGrid(width, height, hexHeight, startX, startY) {
    	let hexCoords = this.getHexCoords(hexHeight);
    	for (let x = 0; x <= width - 1; x++) {
    		for (let y = 0; y <= height-1; y++) {
    			let hexX = x * hexHeight - (x*(hexHeight/9));
    			let hexY = y * hexHeight + (y*2);
    			if (x % 2 === 1) {
    				hexY+= hexHeight / 2;
    			}
    			
    			// Create a hex shape and add it to the container to render.
    			let hex1 = this.add.polygon(hexX+startX, hexY+startY, hexCoords, 0xffffff);
    			hex1.setInteractive({useHandCursor: true});
    			hex1.setData('hasUnit', false);
    			hex1.on('pointerdown', function (event) {
    				let mouseClick = event.event.which; // 1, 2 or 3 for a mouse click.

    				// On left click, enter movement mode for a unit.
    				if (mouseClick === 1 && this.data.list['mode'] === 'View') {
    					
    					// Check if unit exists. If it does, enter movement mode. Otherwise, do nothing.
    					if (hex1.getData('hasUnit')) {
    						this.data.list['mode'] = 'Move';
    						this.data.list['selectedHex'] = hex1;	
    					}
    				}
    				
    				// On left click while in movement mode, move the unit where it needs to go.
    				else if (mouseClick === 1 && this.data.list['mode'] === 'Move') {

    					// Move unit to the new hex if a unit does not exist there.
    					if (hex1.getData('hasUnit') === false) {
    						
    						// Retrieve old hex and unit.
    						let old_hex = this.data.list['selectedHex'];
    						let unit1 = old_hex.getData('hasUnit');
    						
    						// Move unit to the new position.
        					unit1.setPosition(hex1.x + this.gridContainer.x, hex1.y + this.gridContainer.y);
        					
        					// Reset mode, deselect hex, and change unit to be inside new hex.
        					this.data.list['mode'] = 'View';
        					this.data.list['selectedHex'] = false;
        					hex1.setData('hasUnit', unit1);
        					old_hex.setData('hasUnit', false);
    					}
    				}
    				
    				// On right click, add or remove units.
    				else if (mouseClick === 3 && this.data.list['mode'] === 'Add') {
    					
    					// If the box doesn't have a unit, add it.
        				if (hex1.getData('hasUnit') === false) {
        					let unit1 = this.add.rectangle(hex1.x + this.gridContainer.x, hex1.y + this.gridContainer.y, 30, 30, 0x8d45ff);
        					hex1.setData('hasUnit', unit1);
        				}
        				
        				// If it has a unit, remove it.
        				else {
        					let unit1 = hex1.getData('hasUnit');
        					hex1.setData('hasUnit', false);
        					unit1.destroy();
        				}	
    				}
    			}, this);
    			this.gridContainer.add(hex1);
    		}
    	}
    }
    
    getHexCoords(height) {
    	
    	//http://csharphelper.com/blog/2015/10/draw-a-hexagonal-grid-in-c/
    	let width = 4 * (height / 2 / Math.sqrt(3));
    	let y = height / 2;
    	let hexCoords = [
    		0, y, width * 0.25, y - height / 2, width * 0.75, 
    		y - height / 2,  width, y,  width * 0.75, y + height / 2, 
    		width * 0.25, y + height / 2
    	];
    	return hexCoords;
    }
}