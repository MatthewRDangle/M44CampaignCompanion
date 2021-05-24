"use strict"; // Execute JavaScript file in strict mode.

/*
 ** Title: ???.
 ** Description: ???.
 */
class Sand extends Terrain {
	
	constructor() {
		super();
		
		// Display Data.
		this.name = "Sand";
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