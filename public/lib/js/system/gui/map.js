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
	constructor(scene, emitter, mapWidth, mapHeight, draggable) {
		super(scene, emitter); // Import existing properties.
		
		// Map Data
		this.mapWidth = mapWidth;
		this.mapHeight = mapHeight;
		this.tileSize = 75;
		this.tileBorder = 0;
		this.spacing = this.tileSize + this.tileBorder;
		this.draggable = draggable;
		
		this.renMap(); // Initial Render
	}
	
	/*
	 ** Title: Render the map.
	 ** Description: Renders and updates the map.
	 */
	renMap() {

		// Set the background image.
		let scenarioDetails = this.scene.cache.json.get('scenarioJSON');
		if (scenarioDetails.map.background) {
			let backgroundImage = new GUI(this.scene, this.emitter);
			backgroundImage.setCords(0, 0);
			backgroundImage.setBackgroundImage(scenarioDetails.map.background);
			this.addChild(backgroundImage);
		}

		// Construct a new tile for each width count.
		let alphabet = ['A','B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    	for (let x = 0; x <= this.mapWidth - 1; x++) {
    		
    		// Count a new tile for each height count.
    		for (let y = 0; y <= this.mapHeight-1; y++) {
    			let hexX = x * this.spacing - (x*(this.spacing/3.58));
    			let hexY = y * (this.spacing - this.spacing/5);
    			
    			// Even tile columns, offset them down word.
    			if (x % 2 === 1) {
    				hexY+= (this.spacing / 2) - (this.spacing/10);
    			}
    			
    			// Set the ID.
    			let xID = Math.floor( x / alphabet.length ) + alphabet[x % alphabet.length];
    			let yID = y;

    			 // Create and add the tile to the map.
    			this.addTile(hexX, hexY, xID, yID);
    		}
    	}
	}
	
	/*
	 ** Title: Add Tile.
	 ** Description: Creates and appends a tile to the GUI container.
	 */
	addTile(hexX, hexY, idx, idy) {

			// Create a hex shape and add it to the container to render.
			let tile = new HexTile(this.scene, this.emitter, idx, idy);
			tile.setMap(this);
			tile.setCords(hexX, hexY);
			tile.setBackgroundAlpha(0.15);
			
			// Retrieve and assign terrain value for this hex tile if it exists.
			let terrainData = this.scene.data.list['scenarioTerrain'];
			for ( let hexID in terrainData ) {
				if ( hexID === tile.id ) {
					let value = terrainData[ hexID ];
					let terrain = undefined;
					
					if (value === 'Grass')
						terrain = new Grass();
					
					else if (value === 'Ocean')
						terrain = new Ocean();
					
					else if (value === 'River')
						terrain = new River();
					
					else if (value === 'Road')
						terrain = new Road();
					
					else if (value === 'Sand')
						terrain = new Sand();
					
					else if (value === 'Water')
						terrain = new Water();
					
					if ( terrain )
						tile.setTerrain( terrain );
				}
			}

		// Retrieve and assign terrain value for this hex tile if it exists.
		let boardSetupData = this.scene.data.list['boards'];
		for ( let hexID in boardSetupData ) {
			if ( hexID === tile.id ) {
				tile.setBoardSetup(boardSetupData[hexID]);
			}
		}

			// Set tile as draggable & map as zoomable.
			let map = this;
			tile.onClick(function(e) {
				let mouseClick = e.event.which; // 1, 2 or 3 for a mouse click.

	    		// On left click, enter movement mode for a unit.
	    		if (mouseClick === 1 && this.scene.data.list['mode'] === 'View') {

	    			// Check if unit exists. If it does, enter movement mode. Otherwise, do nothing.
	    			let unitType = undefined;
    				if ( tile.units.infantry.length > 0 ) {
    					unitType = "infantry";
    				}
    				else if ( tile.units.vehicle.length > 0 ) {
    					unitType = "vehicle";    					
					}
    				else if ( tile.units.aircraft.length > 0 ) {
    					unitType = "aircraft";
					}
    				else if ( tile.units.naval.length > 0 ) {
    					unitType = "naval";
					}
    				else {
    					return;
    				}
    				
    				// Check if the tile is contested. If it isn't, select unit and enter move mode.
    				if ( !tile.isContested ) {
    				
        				// Select tile and change to move mode.
        				let toMoveUnit = tile.units[unitType][0];
        				if ( toMoveUnit.faction === this.scene.data.list['activeFaction'] )
    	    				toMoveUnit.select();
    				}
    				
    				// If it's a contested tile, open battle overlay.
    				else {
    					this.scene.buildBattleOverlay(this.emitter, tile);
    				}
	    		}
	    		
	    		// On left click while in movement mode, move the unit where it needs to go.
	    		else if (mouseClick === 1 && this.scene.data.list['mode'] === 'Move') {
	    			let old_tile = this.scene.data.list['selectedHex']; // Retrieve the selected tile.
					let unitType = this.scene.data.list['selectedUnitType']; // Retrieve the selected unit type.
					let movingUnit = this.scene.data.list['selectedUnit']; // Retrieve the unit being moved.

	    			// Check if the tile clicked is the same as the currently selected tile.
	    			if ( old_tile === tile )
	    				movingUnit.deselect(); // Deselect the currently selected Unit.
	    			
	    			// If the tile clicked is not the same as the selected tile, evaluate if the move is possible by the unit.
	    			else {
	    				let unitMovePossible = false; // Evaluate variable for whether the unit can move to this new tile based on the acceptable tiles. Assume false by default.
	    				
	    				// Check if the tile matches one of the acceptable tiles.
	    				let cost_to_move = 0;
	    				let acceptableTiles = this.scene.data.list['acceptableTiles'];
	    				for ( let hexID in acceptableTiles ) {
	    					let hexTile = acceptableTiles[hexID].hexTile;
	    					
	    					
	    					// Check if the tile exists in acceptable tiles. If it does, permit the move and modify the unit movement int.
	    					if (hexTile === tile) {
	    						unitMovePossible = true;
	    						cost_to_move = acceptableTiles[hexID].movementCost;
	    					}
	    					
	    				}
	    				
	    				// If the unit move is possible, move the unit to the tile and evaluate the tiles' occupied space to determine the results of the move action.
	    				if (unitMovePossible) {

		    				// If the tile is occupied by the same faction as the unit being moved, join their forces on the same tile.
		    				if ( tile.occupied === movingUnit.faction && tile.units[unitType].length > 0 ) {
	    						let unit = tile.units[unitType][0]; // Retrieve the unit for merging.
	    						
		    					// If the alt key is activate, only move over one unit.
		    					if ( e.event.altKey ) {
		    						unit.changeHealth( unit.health + 1 );
		    						movingUnit.changeHealth( movingUnit.health - 1 );
		    					}
		    					else {

		    						// Merge unit and update the GUI.
									movingUnit.reduceMovementBy(cost_to_move);
				    				unit.mergeWithUnit( movingUnit );
									tile.changeUnitDisplayOrder(unit.type);
				    				tile.updateGUIDisplay();
				    				
			    					// Attach unit to move list so there movements can be refreshed later.
			    					let movedUnits = this.scene.data.list['movedUnits'];
			    					if ( !movedUnits.includes(unit) ) {
			    						this.scene.data.list['movedUnits'].push( unit );
			    					}	
		    					}
		    				}
		    				
		    				// If the tile is occupied by a faction that is not the same as the unit being moved, let the unit contest the area.
		    				else if (tile.occupied !== undefined && tile.occupied !== movingUnit.faction) {
		    					tile.contest( movingUnit.faction ); // Set the tile contested flag.
		    					
		    					// If the alt key is activated, only move over one unit.
		    					if ( e.event.altKey ) {
		    						
		    						// Check if unit already exists for this faction.
		    						let updatedUnit = false;
		    						for ( let idx = 0; idx < tile.units[moveUnit.type].length; idx++ ) {
		    							let unit = tile.units[moveUnit.type][idx];
		    							if (unit.faction = moveUnit.faction) {
		    								movingUnit = movingUnit.heatlh - 1;
		    								unit.health = unit.health + 1;
		    								updatedUnit = true;
		    							}
		    						}
		    						
		    						// If the unit wasn't updated, then add it.
		    						if (!updatedUnit) {
			    						let mUnit = movingUnit.moveToTile(tile, 1);
			    						mUnit.reduceMovementBy( cost_to_move );
			    						movingUnit.changeHealth( movingUnit.health - 1 );
		    						}

		    					}
		    					else {
			    					movingUnit.moveToTile(tile);; // Transfer the unit to the new tile from the old tile.
			    					this.emitter.emit('mode'); // Change the mode to view.
		    					}
		    				}
		    				
		    				// Let the unit move their and consume it's movement points.
		    				else {
		    					
		    					// If the alt key is activate, only move over one unit.
		    					if ( e.event.altKey ) {
		    						let mUnit = movingUnit.moveToTile(tile, 1);
		    						mUnit.reduceMovementBy( cost_to_move );
		    						movingUnit.changeHealth( movingUnit.health - 1 );
		    					}
		    					else {
		    						movingUnit.reduceMovementBy(cost_to_move);
			    					movingUnit.moveToTile( tile );
		    					}
		    				}	
	    				}
	    			}
	    		}
	    		
    			// Right click in Move mode to cancel.
    			else if ( mouseClick === 3 && this.scene.data.list['mode'] === 'Move' ) {
    				let old_tile = this.scene.data.list['selectedHex']; // Retrieve the selected tile.
    				old_tile.dehighlight();
    				this.emitter.emit('mode');
    				this.scene.data.list['selectedHex'] = false;
    				
    				// Delight all moveable to tiles.
    				let acceptableTiles = this.scene.data.list['acceptableTiles'];
    				for (let hexID in acceptableTiles) {
    					let hexTile = acceptableTiles[hexID].hexTile;
    					hexTile.setBackgroundColor(0xC5D6B7);
    				}
    			}

	    		// On left click, add additional units.
	    		else if (mouseClick === 1 && this.scene.data.list['mode'] === 'Add') {
	    			
	    			// If the box doesn't have a unit, add it, otherwise remove it.
	    			if ( tile.units.infantry.length == 0) {
	    				let newUnit = new Infantry( this.scene.data.list['activeFaction'] );
	    				tile.addUnit(newUnit); // Attach the unit to the tile.
	    				newUnit.setOccupied(newUnit.faction); // Set the owner of the tile.
	    			}
	    			else {
	    				if ( this.scene.data.list['activeFaction'] === tile.units.infantry[0].faction ) {
	    					let unit = tile.units.infantry[0];
	    					unit.health++;
	    					tile.updateGUIDisplay();
	    				}
	    			}
	    		}
	    		
	    		// On right click, remove all units.
	    		else if (mouseClick === 3 && this.scene.data.list['mode'] === 'Add') {

	    			if ( tile.units.infantry.length > 0 && this.scene.data.list['activeFaction'] === tile.units.infantry[0].faction ) {
	    				if ( tile.units.infantry[0].health > 1 ) {
	    					tile.units.infantry[0].health--;
	    					tile.updateGUIDisplay();
	    				}
	    				else
	    					tile.removeUnit( tile.units.infantry[0] );
	    					newUnit.setOccupied(undefined); // Set the owner of the tile.
	    			}
	    		}
			});
			tile.onMouseScroll(function(pointer, dx, dy, dz, event) {
				if (dy > 0)
					map.setScale(map.scale - 0.1);
				else if (dy < 0)
					map.setScale(map.scale + 0.1);
			});


			
			//Enable Tile Dragging.
			if (this.draggable) {
				tile.onDragStart(function(pointer) {
					map.container.setData("x_start", map.x);
					map.container.setData("y_start", map.y);
				});
				tile.onDrag(function(pointer, dragX, dragY) {
					let mapX = map.container.getData("x_start") + dragX;
					let mapY = map.container.getData("y_start") + dragY;
					map.setCords(mapX, mapY);
				});
			}
			
			// Add tile to the map.
			this.addChild(tile);
	}
	
	// Retrieve Tile.
	retrieveTile(id) {
		if (typeof id === 'string') {
			// Retrieve all tile hexes to evaluate distance.
			for (let key in this.innerGUI) {
				
				// Check if child is an instance of a hextile.
				let child = this.innerGUI[key];
				if (child instanceof HexTile) {
					let hexTile = child; // If it is, assign it as hexTile.
					
					// Return hextile if the ID matches.
					if (hexTile.id === id)
						return hexTile;
				}
			}
		}
		else
			return undefined;
	}
	
	// Update All Hex Tiles.
	updateMap() {
		for (let idx = 0; idx < this.innerGUI.length; idx++) {
			let childGUI = this.innerGUI[idx]; // Retrieve the child GUI.
			if ( childGUI instanceof HexTile ) {
				childGUI.updateGUIDisplay();
			}
		}
	}
}