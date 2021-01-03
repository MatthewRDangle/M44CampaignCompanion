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
		this.gui = undefined;
	}
	
	attachGUI(gui) {
		if (gui)
			this.gui = gui;
	}
}