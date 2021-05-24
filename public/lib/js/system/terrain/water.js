"use strict"; // Execute JavaScript file in strict mode.

/*
 ** Title: ???.
 ** Description: ???.
 */
class Water extends Terrain {
	
	constructor() {
		super();
		
		// Display Data.
		this.name = "Water";
		this.image = undefined;
		
		// Game Data.
		this.movement_cost = 2;
		this.isPassable = {
				land: false,
				air: true,
				sea: true
		}
	}
}