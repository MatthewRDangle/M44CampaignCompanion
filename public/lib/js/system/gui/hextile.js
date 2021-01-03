"use strict"; // Execute JavaScript file in strict mode.

/*
 ** Title: ???.
 ** Description: ???.
 */
class HexTile extends GUI {
	
	/*
	 ** Title: Constructor
	 ** Description: Builds the tile.
	 */
	constructor(scene, emitter, id) {
		super(scene, emitter); // Import existing properties.
		
		// Set the ID of the tile.
		this.id = undefined;
		if (id && typeof id === 'string')
			this.id = id;
		
		// Create the Polygon.
		let w = 24;
		let h = 20;
		this.setDimensions(w*3, h*3);
		this.setBackgroundShape('polygon'); // TODO For some reason the shape needs to be built after the dimensions.
		this.setBackgroundColor(0xC5D6B7);
		this.setBackgroundBorder(4, 0xFFFFFF);
	}
}