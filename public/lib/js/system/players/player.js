"use strict"; // Execute JavaScript file in strict mode.

/*
 ** Title: ???.
 ** Description: ???.
 */
class Player {
	
	constructor(name, faction) {
		
		this.name = (name && typeof name === 'string') ? name : "Player";
		this.faction = (faction && typeof faction === 'string') ? faction : new Faction();
	}
}