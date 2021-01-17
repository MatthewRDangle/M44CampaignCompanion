"use strict"; // Execute JavaScript file in strict mode.

/*
 ** Title: ???.
 ** Description: ???.
 */
class Naval extends Unit {
	
	constructor(owner) {
		super(owner); // Import existing properties
		
		// Display Data.
		this.type = "naval";
		
		// State Data.
		this.health = 1; // This is the amount of "token" the player may place on the board of this type.
		this.movement = 2;
		this.maxMovement = 2;
		this.howMove = "sea";
	}
}