"use strict"; // Execute JavaScript file in strict mode.

/*
 ** Title: ???.
 ** Description: ???.
 */
class Infantry extends Unit {
	
	constructor(owner) {
		super(owner); // Import existing properties
		
		// Display Data.
		this.type = "infantry";
		
		// State Data.
		this.health = 4; // This is the amount of "token" the player may place on the board of this type.
		this.movement = 2;
		this.maxMovement = 2;
		this.howMove = "land";
	}
}