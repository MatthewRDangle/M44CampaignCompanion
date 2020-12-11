"use strict"; // Execute JavaScript file in strict mode.

/*
 ** Title: ???.
 ** Description: ???.
 */
class Scenario {
	
	constructor(json) {

		// Instructions.
		this.name = (json.name) ? json.name : "";
		this.mission = (json.mission) ? json.mission : "";
		
		// Game Data.
		this.factions = [];
		if (json.factions.length > 0) {
			for (let idx = 0; idx < json.factions.length; idx++) {
				let faction = json.factions[idx]; // Retrieve faction name.
				
				// Create factions based on entry for the scenario.
				if (faction === 'America')
					this.factions.push( new Faction('America', 'USAFlag') );
				else if (faction === 'Germany')
					this.factions.push( new Faction('Germany', 'GermanFlag') );
				else if (faction === 'UK')
					this.factions.push( new Faction('UK', 'UKFlag') );
				else if (faction === 'Soviets')
					this.factions.push( new Faction('Soviets', 'SovietFlag') );
				else if (faction === 'Japan')
					this.factions.push( new Faction('Japan', 'JapanFlag') );
			}
		}
	}
}