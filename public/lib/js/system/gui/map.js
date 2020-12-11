"use strict"; // Execute JavaScript file in strict mode.

/*
 ** Title: ???.
 ** Description: ???.
 */
class Map extends GUI {
	
	/*
	 ** Title: Constructor
	 ** Description: Builds the Map.
	 */
	constructor(scene, emitter, mapWidth, mapHeight) {
		super(scene, emitter); // Import existing properties.
		
		// Map Data
		this.mapWidth = mapWidth;
		this.mapHeight = mapHeight;
		this.tileSize = 75;
		this.tileBorder = 0;
		this.spacing = this.tileSize + this.tileBorder;
		
		this.renMap(); // Initial Render
	}
	
	/*
	 ** Title: Render the map.
	 ** Description: Renders and updates the map.
	 */
	renMap() {

		// Construct a new tile for each width count.
    	for (let x = 0; x <= this.mapWidth - 1; x++) {
    		
    		// Count a new tile for each height count.
    		for (let y = 0; y <= this.mapHeight-1; y++) {
    			let hexX = x * this.spacing - (x*(this.spacing/3.58));
    			let hexY = y * (this.spacing - this.spacing/5);
    			
    			// Even tile columns, offset them down word.
    			if (x % 2 === 1) {
    				hexY+= (this.spacing / 2) - (this.spacing/10);
    			}
    			
    			this.addTile(hexX, hexY);
    		}
    	}
	}
	
	/*
	 ** Title: Add Tile.
	 ** Description: Creates and appends a tile to the GUI container.
	 */
	addTile(hexX, hexY) {
		
			// Create a hex shape and add it to the container to render.
			let tile = new HexTile(this.scene, this.emitter);
			tile.setCords(hexX, hexY);
			this.addChild(tile);
	}
}