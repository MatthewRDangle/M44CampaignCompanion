"use strict"; // Execute JavaScript file in strict mode.

/*
 ** Title: ???.
 ** Description: ???.
 */
class Scenario {
	
	constructor(json) {
		
		// Instructions.
		this.name = "Operation Overlord";
		this.description = "Capture the Airfields and hold them for one turn.";
		this.image = "";
		
		// Game Data.
		this.factions = [];
		this.factions.push( new Faction('Germany', 'GermanFlag') );
		this.factions.push( new Faction('America', 'USAFlag') );
	}
}