"use strict"; // Execute JavaScript file in strict mode.

/*
 ** Title: Create a Hex Tile.
 ** Description: Creates a Single Hex Tile.
 */
class Tile {
	
	/*
	 ** Title: Constructor
	 ** Description: Creates a tile 
	 */
    constructor(scene, container, emitter, startX, startY, tileCords) {
    	
    	// Game Data.
    	this.scene = scene;
    	this.container = container;
    	this.emitter = emitter;
    	
    	// Polygon Data.
    	this.startX = startX;
    	this.startY = startY;
    	this.tileCords = tileCords;
    	this.fillColor = 0xC5D6B7;
    	this.borderColor = 0xFFFFFF;
    	this.polygon = undefined;
    	
    	// Player Data.
    	this.ownership = undefined;
    	this.unit = undefined;
    	
    	
    	this.draw(); // Draw the polygon.
    }
    
	/*
	 ** Title: Add Unit.
	 ** Description: Attachs a unit the this tile.
	 */
    addUnit() {
    	
    	// Check if a unit doesn't already exist on this tile.
    	if ( !this.hasUnit() ) {
    		let unit = this.scene.add.rectangle(this.polygon.x, this.polygon.y, 30, 30, 0x8d45ff);
    		this.container.add(unit);
    		this.unit = unit;
    	}
    }
    
	/*
	 ** Title: Draw.
	 ** Description: Draws the shape onto the screen.
	 */
    draw() {
    	
    	if (this.polygon) {
    		return
    	}
    	
    	this.polygon = this.scene.add.polygon(this.startX, this.startY, this.tileCords, this.fillColor);
    	this.polygon.isStroked = true;
    	this.polygon.lineWidth = 3;
    	this.polygon.strokeColor = this.borderColor;
    	this.polygon.setInteractive({useHandCursor: true});
    	this.container.add(this.polygon);
    	
    	// Move the map with a mouse drag.
    	this.scene.input.setDraggable(this.polygon);
    	this.polygon.on('dragstart', function (pointer) {
    		this.container.setData('x_start', this.container.x);
    		this.container.setData('y_start', this.container.y);
    	}, this);   
    	this.polygon.on('drag', function (pointer, dragX, dragY) {
        	let trueDragX = dragX - this.polygon.x;
        	let trueDragY = dragY - this.polygon.y;
      		this.container.x = this.container.getData('x_start') + trueDragX;
    		this.container.y = this.container.getData('y_start') + trueDragY;
        }, this);
        
    	this.polygon.on('pointerdown', function(event) {
    		let mouseClick = event.event.which; // 1, 2 or 3 for a mouse click.
    		
    		// On left click, enter movement mode for a unit.
    		if (mouseClick === 1 && this.scene.data.list['mode'] === 'View') {
    			// Check if unit exists. If it does, enter movement mode. Otherwise, do nothing.
    			if ( this.hasUnit() ) {
    				this.scene.data.list['mode'] = 'Move';
    				this.emitter.emit('changeMode');
    				this.scene.data.list['selectedHex'] = this;
    			}
    		}
    		
    		// On left click while in movement mode, move the unit where it needs to go.
    		else if (mouseClick === 1 && this.scene.data.list['mode'] === 'Move') {

    			// Move unit to the new hex if a unit does not exist there.
    			if ( !this.hasUnit() ) {
    				
    				// Transfer the unit to the new tile.
    				let old_tile = this.scene.data.list['selectedHex'];
    				old_tile.transferUnit(this);
    				
    				// Reset mode, deselect hex, and change unit to be inside new hex.
    				this.scene.data.list['mode'] = 'View';
    				this.emitter.emit('changeMode');
    				this.scene.data.list['selectedHex'] = false;
    			}
    		}
    
    		// On right click, add or remove units.
    		else if (mouseClick === 3 && this.scene.data.list['mode'] === 'Add') {
    			
    			// If the box doesn't have a unit, add it.
    			if ( !this.hasUnit() ) {
    				this.addUnit();
    			}
    			
    			// If it has a unit, remove it.
    			else {
    				this.removeUnit();
    			}	
    		}
    	}, this);
    }
    
	/*
	 ** Title: Has Unit.
	 ** Description: Check if there is a unit attached to this tile. Returns true or false.
	 */
    hasUnit() {
    	if (this.unit)
    		return true;
    	else
    		return false;
    }
    
	/*
	 ** Title: Remove Unit.
	 ** Description: Removes the unit attached to this tile.
	 */
    removeUnit() {
    	this.unit.destroy(); // Remove the polygon from the screen.
    	this.unit = undefined;
    }
    
	/*
	 ** Title: Transfer Unit.
	 ** Description: Transfers a unit from this tile to another tile.
	 *
	 ** @param - tile - ??? - required - The tile to transfer the unit to.
	 */
    transferUnit(tile) {
    	if ( this.hasUnit() ) {
    		tile.addUnit();
    		this.removeUnit();
    	}
    }
}