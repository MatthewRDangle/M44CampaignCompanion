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
    constructor(scene, container, startX, startY, tileCords) {
    	
    	// Game Data.
    	this.scene = scene;
    	this.container = container;
    	
    	// Polygon Data.
    	this.startX = startX;
    	this.startY = startY;
    	this.tileCords = tileCords;
    	this.fillColor = 0xC5D6B7;
    	this.borderColor = 0xFFFFFF;
    	this.polygon = this.scene.add.polygon(this.startX, this.startY, this.tileCords, this.fillColor);
    	this.polygon.isStroked = true;
    	this.polygon.lineWidth = 3;
    	this.polygon.strokeColor = this.borderColor;
    	this.polygon.setInteractive({useHandCursor: true});
    	this.container.add(this.polygon);
    	
    	// Player Data.
    	this.unit = undefined;
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
    	
		// Move unit to the new position.
		//unit1.setPosition(hex1.x + this.container.x, hex1.y + this.container.y);
    }
}