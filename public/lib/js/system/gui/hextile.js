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
		this.occupied = undefined;
		this.isContested = false;
		this.contested = { 
				attacked: undefined, 
				defender: undefined,
				battleMarker: undefined
		};
		this.topUnit = undefined;
		this.units = {
				infantry: [],
				vehicle: [],
				naval: [],
				aircraft: []
		};
		this.structure = undefined;
		this.terrain = undefined;
		this.boardSetup = undefined;

		// Unit Display Order
		this.unitDisplayOrder = [
			'naval', 'aircraft', 'vehicle', 'infantry'
		];
		
		// Map Access.
		this.map = undefined;
		
		// Create the Polygon.
		let w = 24;
		let h = 20;
		this.setDimensions(w*3, h*3);
		this.setBackgroundShape('polygon');
		this.setBackgroundColor(0xC5D6B7);
		this.setBackgroundBorder(2, 0xFFFFFF);
		
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
	 ** Title: Add Structure
	 ** Description: ???
	 */
	addStructure(structure) {
		this.structure = structure;
	}
	
	/*
	 ** Title: Add Unit
	 ** Description: ???
	 */
	addUnit(unit) {
		this.units[unit.type].push(unit); // Add unit to directory.

		// Build GUI.
		let unit_marker = this.buildGUIDisplay(unit);
		
		// Attach unit GUI.
		unit.attachTile(this); // Attach the tile for later access.
		unit.attachGUI(unit_marker); // Attach the GUI for later access.
		this.addChild(unit_marker); // Attach unit marker GUI to the hex tile.
		this.changeUnitDisplayOrder(unit.type);
		this.updateGUIDisplay();
		
		if (this.occupied === undefined)
			this.occupied = unit.faction;
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
			return unit_marker;
	}
	
	/*
	 ** Title: Change Unit Display Order.
	 ** Description: ???
	 */
	changeUnitDisplayOrder(unitTypeOnTop) {
		this.topUnit = unitTypeOnTop;
		this.unitDisplayOrder = [];

		if (unitTypeOnTop === 'infantry') {
			this.unitDisplayOrder = [
				'naval', 'aircraft', 'vehicle', 'infantry'
			];
		}
		else if (unitTypeOnTop === 'vehicle') {
			this.unitDisplayOrder = [
				'infantry', 'naval', 'aircraft', 'vehicle'
			];
		}
		else if (unitTypeOnTop === 'aircraft') {
			this.unitDisplayOrder = [
				'vehicle', 'infantry', 'naval', 'aircraft'
			];
		}
		else if (unitTypeOnTop === 'naval') {
			this.unitDisplayOrder = [
				'aircraft', 'vehicle', 'infantry', 'naval'
			];
		}
	}
	
	/*
	 ** Title: Contest
	 ** Description: ???
	 */
	contest(faction) {
		
		// Only execute if its not already contested.
		if (!this.isContested) {

			// Create the Battle Marker.
			let battle_marker = new GUI(this.scene, this.emitter);
			battle_marker.setScale(0.5);
			battle_marker.setCords(this.width / 2, this.height / 2);
			battle_marker.setBackgroundAlign('center', 'middle');
			battle_marker.setBackgroundImage("Marker_Battle");
			
			// Update the tile object.
			this.isContested = true;
			this.contested.defender = this.occupied;
			this.contested.attacker = faction;
			this.contested.battleMarker = battle_marker;
			this.addChild(battle_marker); // Render the GUI.
			
			// Add the tile to the contestedArray.
			this.scene.data.list['contestedTiles'].push(this);
		}
		

	}
	
	/*
	 ** Title: Contest Resolve
	 ** Description: ???
	 */
	contestResolve( occupier ) {
		
		// Only resolve if the battle marker is exists.
		if ( this.contested.battleMarker ) {
			
			// Remove the battle marker.
			this.removeChild( this.contested.battleMarker );
			
			// Update the tile object.
			this.isContested = false;
			this.contested.battleMarker = undefined;
			this.contested.attacker = undefined;
			this.contested.defender = undefined;
			
			// If a winning faction is
			if ( occupier )
				this.setOccupied( occupier );
			
			// Hide All Units if they exist.
			if (this.units.infantry.length > 0) {
				for ( let idx = 0; idx < this.units.infantry.length; idx++ ) {
					let unit = this.units.infantry[idx];
					unit.makeGUIvisible();
				}
			}
			if (this.units.vehicle.length > 0) {
				for ( let idx = 0; idx < this.units.vehicle.length; idx++ ) {
					let unit = this.units.vehicle[idx];
					unit.makeGUIvisible();
				}
			}
			if (this.units.naval.length > 0) {
				for ( let idx = 0; idx < this.units.naval.length; idx++ ) {
					let unit = this.units.naval[idx];
					unit.makeGUIvisible();
				}
			}
			if (this.units.aircraft.length > 0) {
				for ( let idx = 0; idx < this.units.aircraft.length; idx++ ) {
					let unit = this.units.aircraft[idx];
					unit.makeGUIvisible();
				}
			}
			
			// Remove the tile from the contest global array.
			let idx = this.scene.data.list['contestedTiles'].indexOf(this);
			this.scene.data.list['contestedTiles'].splice(idx, 1);
		}
	}
	
	/*
	 ** Title: Dehighlight.
	 ** Description: Highlights the hex by changing it's color.
	 */	
	dehighlight() {
		this.setBackgroundColor(0xC5D6B7);
	}
	
	/*
	 ** Title: Deselect.
	 ** Description: ???
	 */	
	deselect() {
		
		// Highlight the text and update the global variable if this hextile is currently selected.
		if (this.scene.data.list['selectedHex'] === this) {
			this.scene.data.list['selectedHex'] = undefined;
			this.dehighlight();	
		}
	}
	
	/*
	 ** Title: Has Unit
	 ** Description: ???
	 */
	hasUnit(unit) {
		let unitsArray = this.units[unit.type];
		for (let idx = 0; idx < unitsArray.length; idx++) {
			let testUnit = unitsArray[idx];
			if (testUnit === unit)
				return true; // Return true once the unit is found and stop looking.
		}
		return false; // Return false to state the unit has not been found.
	}
	
	/*
	 ** Title: Highlight.
	 ** Description: Highlights the hex by changing it's color.
	 */
	highlight() {
		this.setBackgroundColor(0x0ED7014);
	}

	/*
	 ** Title: Retrieve Hex Within Distance.
	 ** Description: ???
	 */
	retrieveHexWithinDistance(distance, howMove, ignoreIDs, moveCost) {
		let approved_tiles = {}; // Storage for all approved tiles within distance.
		
		// If movement cost does not exist, set it to 0.
		if (!moveCost)
			moveCost = 0;

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
					let local_moveCost = hexTile.terrain.movement_cost + moveCost;
					approved_tiles[hexTile.id] = { 
							movementCost: local_moveCost,
							hexTile: hexTile
					};
					
					// If distance is still remaining, check the distance from this tile as well.
					let diff_dist = eval_distance;
					if (diff_dist) {
						
						// If an ignoreID list already exists, append this ID to it and pass it through. Other wise create a new one.
						if (ignoreIDs) {
							ignoreIDs.push(hexTile.id);
							approved_tiles = mergeApprovedTiles( approved_tiles, hexTile.retrieveHexWithinDistance(diff_dist, howMove, ignoreIDs, local_moveCost) );
						}
						else {
							approved_tiles = mergeApprovedTiles( approved_tiles, hexTile.retrieveHexWithinDistance(diff_dist, howMove, [ hexTile.id ]), local_moveCost );
						}
					}
				}
			}
		}
		
		function mergeApprovedTiles(approvedTiles1, approvedTiles2) {
			let mergedTiles = approvedTiles1;
			for (let key in approvedTiles2) {
				
				// Check if record tile exists inside mergedTiles If it does, use the the tile with the lowest cost to move.
				if ( mergedTiles[key] ) {
					if ( mergedTiles[key].movementCost - approvedTiles2[key].movementCost <= 0) {
						mergedTiles[key] = approvedTiles2[key];
					}
				}
				
				// If the tile does not exist, attach it.
				else {
					mergedTiles[key] = approvedTiles2[key];
				}
			}
			
			return mergedTiles;
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
	 ** Title: Remove Structure
	 ** Description: ???
	 */
	removeStructure() {
		
		// Remove the Structure.
		this.removeChild( this.structure );
		
		// Update the Game Object.
		this.structure = undefined;
	}
	
	/*
	 ** Title: Remove Unit
	 ** Description: ???
	 */
	removeUnit(unit) {
		
		// Does the unit exist in the unit tree.
		if ( this.hasUnit(unit) ) {
			unit.tile = undefined;
			
			// Remove the unit from the tile units object and GUI.
			let index = this.units[unit.type].indexOf(unit);
			this.units[unit.type].splice(index, 1); // Remove from unit array.
			this.removeChild(unit.gui); // Removes the GUI from the render.
			
			// Check if last unit is removed to reset ownership.
			if ( this.units.infantry.length == 0 && this.units.vehicle.length == 0 && this.units.naval.length == 0 && this.units.aircraft.length == 0 ) {
				this.occupied = undefined;
			}	
		}
	}
	
	/*
	 ** Title: Set Occupied.
	 ** Description: ???
	 */
	setOccupied(faction) {
		if (faction)
			this.occupied = faction;
		else
			this.occupied = undefined;
	}

	/*
	** Title: Set Board
	** Description: ???
	 */
	setBoardSetup(imageID) {
		if (imageID)
			this.boardSetup = imageID;
	}
	
	/*
	 ** Title: Set Map
	 ** Description: ???
	 */
	setMap(map) {
		if (map)
			this.map = map;
	}
	
	/*
	 ** Title: Set Terrain
	 ** Description: ???
	 */
	setTerrain(terrain) {
		if (terrain)
			this.terrain = terrain;
	}
	
	/*
	 ** Title: Select
	 ** Description: ???
	 */
	select() {
		
		// If an existing tile is already selected, deselect it.
		if ( this.scene.data.list['selectedHex'] instanceof HexTile ) {
			let old_selected_tile = this.scene.data.list['selectedHex'];
			old_selected_tile.deselect();
		}
		
		// Highlight the text and update the global variable.
		this.scene.data.list['selectedHex'] = this;
		this.highlight();
	}
	
	/*
	 ** Title: Transfer Unit
	 ** Description: ???
	 */
	transferUnit(unit, tile) {

		this.removeUnit(unit);
		tile.addUnit(unit);

		// Change order.
		if (unit.type === 'infantry') {
			if ( this.units.vehicle.length > 0 ) { this.changeUnitDisplayOrder('vehicle');  }
			else if ( this.units.aircraft.length > 0 ) { this.changeUnitDisplayOrder('aircraft'); }
			else if ( this.units.naval.length > 0 ) { this.changeUnitDisplayOrder('naval'); }
			else if ( this.units.infantry.length > 0 ) { this.changeUnitDisplayOrder('infantry'); }
			else { this.topUnit = undefined; }
		}
		else if (unit.type === 'vehicle') {
			if ( this.units.aircraft.length > 0 ) { this.changeUnitDisplayOrder('aircraft'); }
			else if ( this.units.naval.length > 0 ) { this.changeUnitDisplayOrder('naval'); }
			else if ( this.units.infantry.length > 0 ) { this.changeUnitDisplayOrder('infantry'); }
			else if ( this.units.vehicle.length > 0 ) { this.changeUnitDisplayOrder('vehicle');  }
			else { this.topUnit = undefined; }
		}
		else if (unit.type === 'aircraft') {
			if ( this.units.naval.length > 0 ) { this.changeUnitDisplayOrder('naval'); }
			else if ( this.units.infantry.length > 0 ) { this.changeUnitDisplayOrder('infantry'); }
			else if ( this.units.vehicle.length > 0 ) { this.changeUnitDisplayOrder('vehicle');  }
			else if ( this.units.aircraft.length > 0 ) { this.changeUnitDisplayOrder('aircraft'); }
			else { this.topUnit = undefined; }
		}
		else if (unit.type === 'naval') {
			if ( this.units.infantry.length > 0 ) { this.changeUnitDisplayOrder('infantry'); }
			else if ( this.units.vehicle.length > 0 ) { this.changeUnitDisplayOrder('vehicle');  }
			else if ( this.units.aircraft.length > 0 ) { this.changeUnitDisplayOrder('aircraft'); }
			else if ( this.units.naval.length > 0 ) { this.changeUnitDisplayOrder('naval'); }
			else { this.topUnit = undefined; }
		}
		this.updateGUIDisplay();
	}
	
	/*
	 ** Title: Swap GUI Display.
	 ** Description: ???
	 */
	updateGUIDisplay() {
		let tile = this;
		let order = this.unitDisplayOrder;
		for (let idx = 0; idx < order.length; idx++)
			updateUnit( order[idx] );

		// If the tile is contested. Rebuild the contested gui as well.
		if (tile.isContested && tile.contested.battleMarker) {
			this.removeChild( this.contested.battleMarker );

			let battle_marker = new GUI(this.scene, this.emitter);
			battle_marker.setScale(0.5);
			battle_marker.setCords(this.width / 2, this.height / 2);
			battle_marker.setBackgroundAlign('center', 'middle');
			battle_marker.setBackgroundImage("Marker_Battle");

			this.contested.battleMarker = battle_marker;
			this.addChild(battle_marker); // Render the GUI.
		}

		// Update Unit.
		function updateUnit(type) {
			let unit_array = tile.units[type];
			if (unit_array.length > 0) {
				let unit = unit_array[0];

				// Build GUI.
				unit.gui.destroy();
				let unit_marker = tile.buildGUIDisplay(unit);

				// Attach GUI.
				unit.attachGUI(unit_marker);
				tile.addChild(unit_marker);
			}
		}
	}
}