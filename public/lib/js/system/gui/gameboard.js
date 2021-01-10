"use strict"; // Execute JavaScript file in strict mode.

/*
 ** Title: ???.
 ** Description: ???.
 */
class GameBoard extends GUI {
	
	constructor(scene, emitter, xTiles, yTiles) {
		super(scene, emitter); // Import existing properties

		// Map Data.
		this.xTiles = xTiles;
		this.yTiles = yTiles;
		this.mapGUI = new Map(scene, emitter, xTiles, yTiles, true);
		this.modeGUI = new GUI(scene, emitter);
		
		// Render Setup.
		this.renBoard();
	}

	/*
	 ** Title: Add Unit.
	 ** Description: Creates a unit at a particular position.
	 */
	addUnit(tileID, unitType, unitCount, unitOwner) {
		let map = this.mapGUI;
		for (let idx = 0; idx <map.innerGUI.length; idx++) {
			let childGUI = map.innerGUI[idx]; // Retrieve child GUI object.
			
			// Don't only continue if the object is a hextile.
			if ( childGUI instanceof HexTile ) {
				let tile = childGUI;
				
				// Create units for this tile is the ID matches.
				if ( tile.id === tileID ) {
					let unit = undefined; // Create unit placeholder.
					if (unitType === "infantry") { unit = new Infantry(unitOwner); }
					else if (unitType === "vehicle") { unit = new Vehicle(unitOwner); }
					else if (unitType === "aircraft") { unit = new Aircraft(unitOwner); }
					else if (unitType === "naval") { unit = new Naval(unitOwner); }
					else { return } // If no unit type matches, escape this.
					
					if ( unitCount > 0 ) { unit.health = unitCount }; // Add the unit health.
					tile.addUnit(unit); // Create the unit on this tile.
				}
			}
		}
	}
	
	/*
	 ** Title: Render Board.
	 ** Description: Create and update the board info.
	 */
	renBoard() {
    	this.setCords(15, 40);
		this.addChild(this.mapGUI);
		this.addChild(this.modeGUI);
		
		// Create Text Mode.
		this.modeGUI.setDimensions(115, 40);
		this.modeGUI.setCords(0, 0);
    	this.modeGUI.setDepth(2);
		this.modeGUI.setTextAlign( "center", "middle");
		this.modeGUI.setTextString("Mode: View");
    	this.modeGUI.setBackgroundColor(0x404040);
    	
    	// Set up spacebar event.
    	this.scene.input.keyboard.on('keydown', function() {
    		this.emitter.emit("mode");
    	}, this);
	}
	
	/*
	 ** Title: Update Mode.
	 ** Description: Updates the text associated with the mode.
	 */
	updateMode(value) {
		this.modeGUI.setCords(this.width - this.modeGUI.width - 10, 10);
		this.modeGUI.setTextString("Mode: " + value);
		this.updateGUI();
	}
	
	/*
	 ** Title: Update Board.
	 ** Description: ???
	 */
	updateBoard() {
		this.mapGUI.updateMap();
	}
}