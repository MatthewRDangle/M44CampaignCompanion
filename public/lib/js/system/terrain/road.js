"use strict"; // Execute JavaScript file in strict mode.

/*
 ** Title: ???.
 ** Description: ???.
 */
class Road extends Terrain {
	
	constructor() {
		super();
		
		// Display Data.
		this.name = "Terrain";
		this.image = undefined;
		
		// Game Data.
		this.movement_cost = 1;
		this.isPassable = {
				land: true,
				air: true,
				sea: false
		}
	}
}