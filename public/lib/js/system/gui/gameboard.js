"use strict"; // Execute JavaScript file in strict mode.

/*
 ** Title: ???.
 ** Description: ???.
 */
class GameBoard extends GUI {
	
	constructor(scene, emitter, xTiles, yTiles) {
		super(scene, emitter); // Import existing properties
		
		// Map Data.
		this.mapGUI = new Map(scene, emitter, xTiles, yTiles);
		
		// Overlay GUIs
		this.modeGUI = undefined;
	}
	
	/*
	 ** Title: Render Board.
	 ** Description: Create and update the board info.
	 */
	renBoard() {}
}