"use strict"; // Execute JavaScript file in strict mode.

/*
 ** Title: ???.
 ** Description: ???.
 */
class Unit {
	
	constructor(owner) {
		
		// Display Data.
		this.name = "Unit";
		this.type = "Generic";
		
		// State Data.
		this.health = 1; // This is the amount of "token" the player may place on the board of this type.
		this.movement = 0;
		this.maxMovement = 0;
		this.howMove = undefined;
		
		// Faction Information
		this.faction = owner; // AKA the owner/commander of this unit.
		
		// GUI Information.
		this.tile = undefined;
		this.gui = undefined;
	}
	
	attachTile(tile) {
		if (tile)
			this.tile = tile;
	}
	
	attachGUI(gui) {
		if (gui)
			this.gui = gui;
	}

	mergeWithUnit(unit) {
		if (unit) {
			this.health = this.health + unit.health; // Add the two health values together.
			
			// The new movement speed will be the lesser value of the two units.
			if (unit.movement < this.movement) {
				this.movement = unit.movement;
			}
			
			// The new max movement speed will be the lesser of the two.
			if (unit.maxMovement < this.maxMovement) {
				this.maxMovement = unit.maxMovement;
			}
			
			// Remove unit from the board.
			unit.tile.removeUnit(unit);
		}
	}
	
	resetUnitMovement() {
		this.movement = this.maxMovement;
	}
}