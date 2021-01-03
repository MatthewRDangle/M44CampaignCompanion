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
				infantry: [],
				vehicle: [],
				naval: [],
				aircraft: []
		};
		this.structure = undefined;
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
		this.units[unit.type].push(unit); // Add unit to directory.

		// Attach unit GUI.
		let unit_marker = new GUI(this.scene, this.emitter);
		unit_marker.setCords(this.width / 2, this.height / 2);
		unit_marker.setScale(0.25);
		unit_marker.setDimensions(0, 10);
		unit_marker.setBackgroundAlign('center', 'middle');
		unit_marker.setBackgroundImage('Friendly_Infantry');
		unit.attachGUI(unit_marker); // Attach the GUI for later access.
		
		this.addChild(unit_marker); // Attach unit marker gui to the hex tile.
	}
	
	/*
	 ** Title: Remove Unit
	 ** Description: ???
	 */
	removeUnit(unit) {
		let index = this.units[unit.type].indexOf(unit);
		this.units[unit.type].splice(index, 1); // Remove from unit array.
		this.removeChild(unit.gui);
	}
	
	/*
	 ** Title: Add Structure
	 ** Description: ???
	 */
	addStructure(structure) {
		this.structure = structure;
	}
	
	/*
	 ** Title: Remove Structure
	 ** Description: ???
	 */
	addStructure() {
		this.structure = undefined;
	}
	
	/*
	 ** Title: Add Terrain
	 ** Description: ???
	 */
	setTerrain(terrain) {
		if (terrain)
			this.terrain = terrain;
	}
}