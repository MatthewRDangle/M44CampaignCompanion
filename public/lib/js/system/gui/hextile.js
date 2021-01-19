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
	constructor(scene, emitter, idx, idy) {
		super(scene, emitter); // Import existing properties.

		// Set the ID of the tile.
		this.id = idx + idy;
		this.idX = idx;
		this.idY = idy;
		
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
		
		// Map Access.
		this.map = undefined;
		
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
	
	setMap(map) {
		if (map)
			this.map = map;
	}
	
	retrieveHexWithinDistance(distance, howMove, ignoreIDs) {
		let approved_tiles = []; // Storage for all approved tiles within distance.

		// Return nothing if distance is not greater then 0 or simply does not exist.
		if (!distance && distance <= 0)
			return [];
		
		let startHex = this; // Easy to rememeber when retrieve the hex where it began.
		
		// Find Hex adjacent to this hex.
		let alphabet = ['A','B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
		
		let checkYsame = startHex.idY; // Hex Y value with same Y.
		let checkYtop = startHex.idY - 1 // Hex Y value to the that's above.
		let checkYbottom = startHex.idY + 1 // Hex Y value that's below.
		let checkXsame = startHex.idX; // Hex X value with same X.
		let checkXleft = retrieveAlphabet( startHex.idX, -1 ); // Hex X value that's left.
		let checkXright = retrieveAlphabet( startHex.idX, 1 ); // Hex X value that's right.
		let odd_or_even_row = findOddEven( startHex.idX );
		
		// Retrieve Hexes to the left.
		if (checkXleft) {
			if (checkYsame >= 0) {
				let eval_hexTile = this.map.retrieveTile(checkXleft + checkYsame);
				if (eval_hexTile) {
					evaluate_hexTile(this, eval_hexTile);
				}
			}
			
			// Check if the tile is an odd or even tile and select the correct adjacent tile to check accordingly.
			if (odd_or_even_row === 'odd') {
				if (checkYbottom >= 0) {
					let eval_hexTile = this.map.retrieveTile(checkXleft + checkYbottom);
					if (eval_hexTile) {
						evaluate_hexTile(this, eval_hexTile);
					}
				}
			}
			else if (odd_or_even_row === 'even') {
				if (checkYtop >= 0) {
					let eval_hexTile = this.map.retrieveTile(checkXleft + checkYtop);
					if (eval_hexTile) {
						evaluate_hexTile(this, eval_hexTile);
					}
				}	
			}
		}
		
		// Retrieve Hexes in the center.
		if (checkXsame) {
			if (checkYtop >= 0) {
				let eval_hexTile = this.map.retrieveTile(checkXsame + checkYtop);
				if (eval_hexTile) {
					evaluate_hexTile(this, eval_hexTile);
				}
			}
		
			if (checkYbottom >= 0) {
				let eval_hexTile = this.map.retrieveTile(checkXsame + checkYbottom);
				if (eval_hexTile) {
					evaluate_hexTile(this, eval_hexTile);
				}
			}
		}
		
		// Retrieve hexes to the right.
		if (checkXright) {
			if (checkYsame >= 0) {
				let eval_hexTile = this.map.retrieveTile(checkXright + checkYsame);
				if (eval_hexTile) {
					evaluate_hexTile(this, eval_hexTile);
				}
			}
			
			// Check if the tile is an odd or even tile and select the correct adjacent tile to check accordingly.
			if (odd_or_even_row === 'odd') {
				if (checkYbottom >= 0) {
					let eval_hexTile = this.map.retrieveTile(checkXright + checkYbottom);
					if (eval_hexTile) {
						evaluate_hexTile(this, eval_hexTile);
					}
				}
			}
			else if (odd_or_even_row === 'even') {
				if (checkYtop >= 0) {
					let eval_hexTile = this.map.retrieveTile(checkXright + checkYtop);
					if (eval_hexTile) {
						evaluate_hexTile(this, eval_hexTile);
					}
				}	
			}
		}
		
		return approved_tiles;
		
		function findOddEven(value) {
			
			// Find the new character index.
			let char = value.substring(value.length - 1);
			let char_idx = alphabet.indexOf(char);
			
			let test = char_idx % 2;
			if (test == 0)
				return 'even';
			else
				return 'odd';
		}
		
		// Evaluates a tile and makes sure it's within the distance specified.
		function evaluate_hexTile(ths, hexTile) {

			// If this hexTile is part of the ignore ID list, ignore it and don't continue.
			if (ignoreIDs) {
				for (let idx = 0; idx < ignoreIDs.length; idx++) {
					let id = ignoreIDs[idx];
					if (hexTile.id === id)
						return;
				}
			}
			
			let terrain = hexTile.terrain;
			if (terrain instanceof Terrain) {
				
				// Check if the hex is passable.
				if ( !terrain.isPassable[howMove] )
					return;
				
				// Retrieve the evaluation distance to see if it possible to move into.
				let eval_distance = distance - terrain.movement_cost;
				if (eval_distance >= 0) {
					approved_tiles.push(hexTile);
					
					// If distance is still remaining, check the distance from this tile as well.
					let diff_dist = eval_distance;
					if (diff_dist) {
						
						// If an ignoreID list already exists, append this ID to it and pass it through. Other wise create a new one.
						if (ignoreIDs) {
							ignoreIDs.push(hexTile.id);
							approved_tiles = approved_tiles.concat( hexTile.retrieveHexWithinDistance(diff_dist, howMove, ignoreIDs ));
						}
						else {
							approved_tiles = approved_tiles.concat( hexTile.retrieveHexWithinDistance(diff_dist, howMove, [ths.id, hexTile.id] ));
						}
					}
				}
			}
		}
		
		// Retrieve the Alphabetical index value for an idX.
		function retrieveAlphabet(value, modifier) {
			
			// Find the new character index.
			let char = value.substring(value.length - 1);
			let num = (value.length > 1) ? value.substring(0, value.length - 1) : 0;
			let char_idx = alphabet.indexOf(char);
			let found_char_idx = eval_find_char_idx(num, char_idx + modifier);
			
			// Find the character.
			let found_char = alphabet[ found_char_idx ];
			return num + found_char;
			
			// Ensures the found_char_idx is a always valid X id.
			function eval_find_char_idx(num, idx) {
				let found_char_idx = idx;
				
				// If the found character is less then 0, begin loop the alphabet array. (ie. 0 - 1 = array.length - 1).
				if (found_char_idx < 0) {
					found_char_idx = alphabet.length -1 + found_char_idx;
					
					// If numb equals 0, then don't eval further.
					if (num == 0)
						return undefined;
					else
						return eval_find_char_idx(find_char_idx);
				}
				else
					return found_char_idx;
			}
		}
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