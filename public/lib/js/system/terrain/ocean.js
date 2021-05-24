"use strict"; // Execute JavaScript file in strict mode.

/*
 ** Title: ???.
 ** Description: ???.
 */
class Ocean extends Terrain {
	
	constructor() {
		super();
		
		// Display Data.
		this.name = "Ocean";
		this.image = undefined;
		
		// Game Data.
		this.movement_cost = 1;
		this.isPassable = {
				land: false,
				air: true,
				sea: true
		}
	}
}