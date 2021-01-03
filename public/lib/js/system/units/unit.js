"use strict"; // Execute JavaScript file in strict mode.

/*
 ** Title: ???.
 ** Description: ???.
 */
class Unit {
	
	constructor() {
		
		// Display Data.
		this.name = "Unit";
		this.type = "Generic";
		
		// State Data.
		this.movement = 0;
		this.maxMovement = 0;
		
		// Faction Information
		this.faction = undefined;
		
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
}