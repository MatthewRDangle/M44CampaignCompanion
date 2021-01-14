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
		this.topUnit = undefined;
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
		this.setBackgroundShape('polygon');
		this.setBackgroundColor(0xC5D6B7);
		this.setBackgroundBorder(4, 0xFFFFFF);
		
		// Display the id text.
		if ( this.scene.data.list['devTools'] ) {
			let idText = new GUI(this.scene, this.emitter);
			idText.setTextString(this.id);
			idText.setCords(this.width - 15, 10);
			idText.setScale(0.75);
			idText.setTextHAlign("right");
			this.addChild(idText);	
		}
	}
	
	/*
	 ** Title: Add Unit
	 ** Description: ???
	 */
	addUnit(unit, count) {
		this.units[unit.type].push(unit); // Add unit to directory.

		// Build GUI.
		let unit_marker = this.buildGUIDisplay(unit);
		
		// Attach unit GUI.
		unit.attachTile(this); // Attach the tile for later access.
		unit.attachGUI(unit_marker); // Attach the GUI for later access.
		this.addChild(unit_marker); // Attach unit marker gui to the hex tile.
	}
	
	/*
	 ** Title: Remove Unit
	 ** Description: ???
	 */
	removeUnit(unit) {
		unit.tile = undefined;
		let index = this.units[unit.type].indexOf(unit);
		this.units[unit.type].splice(index, 1); // Remove from unit array.
		this.removeChild(unit.gui);
	}
	
	/*
	 ** Title: Transfer Unit
	 ** Description: ???
	 */
	transferUnit(unit, tile) {

		this.removeUnit(unit);
		tile.addUnit(unit);

		// Change order.
		if (unit === 'infantry') {
			if ( this.units.vehicle.lenght > 0 ) { this.changeUnitDisplayOrder('vehicle');  }
			else if ( this.units.aircraft.lenght > 0 ) { this.changeUnitDisplayOrder('aircraft'); }
			else if ( this.units.naval.lenght > 0 ) { this.changeUnitDisplayOrder('naval'); }	
			else if ( this.units.infantry.lenght > 0 ) { this.changeUnitDisplayOrder('infantry'); }
			else { this.topUnit = undefined; }
		}
		else if (unit === 'vehicle') {
			if ( this.units.aircraft.lenght > 0 ) { this.changeUnitDisplayOrder('aircraft'); }
			else if ( this.units.naval.lenght > 0 ) { this.changeUnitDisplayOrder('naval'); }	
			else if ( this.units.infantry.lenght > 0 ) { this.changeUnitDisplayOrder('infantry'); }
			else if ( this.units.vehicle.lenght > 0 ) { this.changeUnitDisplayOrder('vehicle');  }
			else { this.topUnit = undefined; }
		}
		else if (unit === 'aircraft') {
			if ( this.units.naval.lenght > 0 ) { this.changeUnitDisplayOrder('naval'); }	
			else if ( this.units.infantry.lenght > 0 ) { this.changeUnitDisplayOrder('infantry'); }
			else if ( this.units.vehicle.lenght > 0 ) { this.changeUnitDisplayOrder('vehicle');  }
			else if ( this.units.aircraft.lenght > 0 ) { this.changeUnitDisplayOrder('aircraft'); }
			else { this.topUnit = undefined; }
		}
		else if (unit === 'naval') {
			if ( this.units.infantry.lenght > 0 ) { this.changeUnitDisplayOrder('infantry'); }
			else if ( this.units.vehicle.lenght > 0 ) { this.changeUnitDisplayOrder('vehicle');  }
			else if ( this.units.aircraft.lenght > 0 ) { this.changeUnitDisplayOrder('aircraft'); }
			else if ( this.units.naval.lenght > 0 ) { this.changeUnitDisplayOrder('naval'); }	
			else { this.topUnit = undefined; }
		}
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
	 ** Title: Swap GUI Display.
	 ** Description: ???
	 */
	updateGUIDisplay() {
		
		// Infantry Update.
		if (this.units.infantry.length > 0) {
			let unit = this.units.infantry[0]; // Retrieve Unit.
			unit.gui.destroy(); // Destroy the current GUI
			
			// Build GUI.
			let unit_marker = this.buildGUIDisplay(unit); // TODO currently broken!!! FIX IT!!

			// Attach GUI.
			unit.attachGUI(unit_marker); // Attach the GUI for later access.
			this.addChild(unit_marker); // Attach unit marker gui to the hex tile.
		}
		
		// Vehicle Update.
		if (this.units.vehicle.length > 0) {
			let unit = this.units.vehicle[0]; // Retrieve Unit.
			unit.gui.destroy(); // Destroy the current GUI
			
			// Build GUI.
			let unit_marker = this.buildGUIDisplay(unit); // TODO currently broken!!! FIX IT!!

			// Attach GUI.
			unit.attachGUI(unit_marker); // Attach the GUI for later access.
			this.addChild(unit_marker); // Attach unit marker gui to the hex tile.
		}
		
		// Aircraft Update.
		if (this.units.aircraft.length > 0) {
			let unit = this.units.aircraft[0]; // Retrieve Unit.
			unit.gui.destroy(); // Destroy the current GUI
			
			// Build GUI.
			let unit_marker = this.buildGUIDisplay(unit); // TODO currently broken!!! FIX IT!!

			// Attach GUI.
			unit.attachGUI(unit_marker); // Attach the GUI for later access.
			this.addChild(unit_marker); // Attach unit marker gui to the hex tile.
		}
		
		// Naval Update.
		if (this.units.naval.length > 0) {
			let unit = this.units.naval[0]; // Retrieve Unit.
			unit.gui.destroy(); // Destroy the current GUI
			
			// Build GUI.
			let unit_marker = this.buildGUIDisplay(unit); // TODO currently broken!!! FIX IT!!

			// Attach GUI.
			unit.attachGUI(unit_marker); // Attach the GUI for later access.
			this.addChild(unit_marker); // Attach unit marker gui to the hex tile.
		}
	}
	
	/*
	 ** Title: Build GUI Display.
	 ** Description: Builds the GUI display based on ownership and unit.
	 */
	buildGUIDisplay(unit) {
		
			// Check if ownership matches the turn indicator, if it does, set the image.
			let image = undefined;
			let unitType = unit.type.charAt(0).toUpperCase() + unit.type.slice(1);
			if ( this.scene.data.list['activeFaction'] === unit.faction )
				image = 'Friendly_' + unitType;
			else
				image = 'Enemy_' + unitType;
		
			// Attach unit GUI.
			let unit_marker = new GUI(this.scene, this.emitter);
			unit_marker.setCords(this.width / 2, this.height / 2);
			unit_marker.setScale(0.25);
			unit_marker.setDimensions(0, 10);
			unit_marker.setBackgroundAlign('center', 'middle');
			unit_marker.setBackgroundImage(image);
			
			// Build the Health Counter.
			let health_counter = new GUI(this.scene, this.emitter);
			health_counter.setDimensions(20, 20);
			health_counter.setCords( (this.width / 2) - (health_counter.width / 2), (this.height / 2) - (health_counter.height / 2) );
			health_counter.setScale(3);
			health_counter.setTextAlign('center', 'middle');
			health_counter.setTextString(unit.health);
			health_counter.setBackgroundColor(0x000000);
			
			// Return the Marker.
			unit_marker.addChild(health_counter);
//			return health_counter;
			return unit_marker;
	}
	
	/*
	 ** Title: Highlight.
	 ** Description: Highlights the hex by changing it's color.
	 */
	highlight() {
		this.setBackgroundColor(0x0ED7014);
	}
	dehighlight() {
		this.setBackgroundColor(0xC5D6B7);
	}
	
	changeUnitDisplayOrder(unitTypeOnTop) {
		this.topUnit = unitTypeOnTop;
		
//		if (unitTypeOnTop === 'infantry') {
//			if ( this.units['infantry'][0] ) { this.units['infantry'][0].gui.setDepth(100); };
//			if ( this.units['vehicle'][0] ) { this.units['vehicle'][0].gui.setDepth(102); };
//			if ( this.units['aircraft'][0] ) { this.units['aircraft'][0].gui.setDepth(103); };
//			if ( this.units['naval'][0] ) { this.units['naval'][0].gui.setDepth(104) };
//		}
//		else if (unitTypeOnTop === 'vehicle') {
//			if ( this.units['infantry'][0] ) { this.units['infantry'][0].gui.setDepth(104); };
//			if ( this.units['vehicle'][0] ) { this.units['vehicle'][0].gui.setDepth(101); };
//			if ( this.units['aircraft'][0] ) { this.units['aircraft'][0].gui.setDepth(102); };
//			if ( this.units['naval'][0] ) { this.units['naval'][0].gui.setDepth(103) };
//		}
//		else if (unitTypeOnTop === 'aircraft') {
//			if ( this.units['infantry'][0] ) { this.units['infantry'][0].gui.setDepth(103); };
//			if ( this.units['vehicle'][0] ) { this.units['vehicle'][0].gui.setDepth(104); };
//			if ( this.units['aircraft'][0] ) { this.units['aircraft'][0].gui.setDepth(101); };
//			if ( this.units['naval'][0] ) { this.units['naval'][0].gui.setDepth(102) };
//		}
//		else if (unitTypeOnTop === 'naval') {
//			if ( this.units['infantry'][0] ) { this.units['infantry'][0].gui.setDepth(102); };
//			if ( this.units['vehicle'][0] ) { this.units['vehicle'][0].gui.setDepth(103); };
//			if ( this.units['aircraft'][0] ) { this.units['aircraft'][0].gui.setDepth(104); };
//			if ( this.units['naval'][0] ) { this.units['naval'][0].gui.setDepth(101) };
//		}
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