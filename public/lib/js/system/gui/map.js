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
		this.hexHeight = 75;
		
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
    			let hexX = x * this.hexHeight - (x*(this.hexHeight/9));
    			let hexY = y * this.hexHeight + (y*2);
    			if (x % 2 === 1) {
    				hexY+= this.hexHeight / 2;
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
			this.container.add(tile);
	}
}