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
		
		// Game Data.
		this.units = {
				infantry: 0,
				tank: 0,
				ship: 0,
				plane: 0
		};
		this.structures = {
				airbase: undefined,
				encampment: undefined
		};
		this.terrain = undefined;
		
		// Create the Polygon.
		let w = 24;
		let h = 20;
		this.setDimensions(w*3, h*3);
		this.setBackgroundShape('polygon'); // TODO For some reason the shape needs to be built after the dimensions.
		this.setBackgroundColor(0xC5D6B7);
		this.setBackgroundBorder(4, 0xFFFFFF);
	}
	
	/*
	 ** Title: Add Unit
	 ** Description: ???
	 */
	addUnit(unit) {
		this.units[unit.type] + 1; // Add unit to directory.
	}
	
	/*
	 ** Title: Add Structure
	 ** Description: ???
	 */
	addStructure(structure) {
		this.structures[structure.type] + 1; // Add structure to directory.
	}
	
	/*
	 ** Title: Add Terrain
	 ** Description: ???
	 */
	setTerrain(terrain) {
		this.terrain = terrain;
	}
}