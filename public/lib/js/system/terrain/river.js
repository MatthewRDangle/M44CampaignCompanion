"use strict"; // Execute JavaScript file in strict mode.

/*
 ** Title: ???.
 ** Description: ???.
 */
class River extends Terrain {
	
	constructor() {
		super();
		
		// Display Data.
		this.name = "River";
		this.image = undefined;
		
		// Game Data.
		this.movement_cost = 2;
		this.isPassable = {
				land: true,
				air: true,
				sea: false
		}
	}
}