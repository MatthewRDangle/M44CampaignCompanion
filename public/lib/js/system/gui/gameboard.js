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