"use strict"; // Execute JavaScript file in strict mode.

/*
 ** Title: ???.
 ** Description: ???.
 */
class Ocean extends Terrain {
	
	constructor() {
		super();
		
		// Display Data.
		this.name = "Terrain";
		this.image = undefined;
		
		// Game Data.
		this.movement_cost = 2;
		this.isPassable = {
				land: true,
				air: true,
				sea: true,
		}
	}
}