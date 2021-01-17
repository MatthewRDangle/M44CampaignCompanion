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
    			let xID = Number(x / alphabet.length).toFixed() + alphabet[x % alphabet.length];
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

			// Set tile as draggable.
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
    				
    				// Select tile and change to move mode.
    				let unitArray = tile.units[unitType];
    				if ( unitArray[0].faction === this.scene.data.list['activeFaction'] ) {
	    				this.emitter.emit('moveMode'); // Change the mode to move.
	    				this.scene.data.list['selectedHex'] = tile; // Set the selected tile.
	    				tile.highlight();
	    				this.scene.data.list['selectedUnitType'] = unitType;
    				}
	    		}
	    		
	    		// On left click while in movement mode, move the unit where it needs to go.
	    		else if (mouseClick === 1 && this.scene.data.list['mode'] === 'Move') {
	    			let old_tile = this.scene.data.list['selectedHex']; // Retrieve the selected tile.
					let unitType = this.scene.data.list['selectedUnitType']; // Retrieve the selected unit type.
	    			
	    			// If the player selects the same tile, change which unit is selected.
	    			if ( old_tile === tile ) {
	    				
	    				// Change the unit type based on what unit is selected.
	    				if ( unitType === 'infantry' ) {
		    				if ( old_tile.units.vehicle.length > 0 ) {
		    					unitType = "vehicle";
							}
		    				else if ( old_tile.units.aircraft.length > 0 ) {
		    					unitType = "aircraft";
							}
		    				else if ( old_tile.units.naval.length > 0 ) {
		    					unitType = "naval";
							}
	    				}
	    				else if ( unitType === 'vehicle' ) {
		    				if ( old_tile.units.aircraft.length > 0 ) {
		    					unitType = "aircraft";
							}
		    				else if ( old_tile.units.naval.length > 0 ) {
		    					unitType = "naval";
							}
		    				else if ( old_tile.units.infantry.length > 0 ) {
		    					unitType = "infantry";
		    				}
	    				}
	    				else if ( unitType === 'aircraft' ) {
		    				 if ( old_tile.units.naval.length > 0 ) {
		    					unitType = "naval";
							}
		    				else if ( old_tile.units.infantry.length > 0 ) {
		    					unitType = "infantry";
		    				}
		    				else if ( old_tile.units.vehicle.length > 0 ) {
		    					unitType = "vehicle";
							}
	    				}
	    				else if ( unitType === 'naval' ) {
		    				if ( old_tile.units.infantry.length > 0 ) {
		    					unitType = "infantry";
		    				}
		    				else if ( old_tile.units.vehicle.length > 0 ) {
		    					unitType = "vehicle";
							}
		    				else if ( old_tile.units.aircraft.length > 0 ) {
		    					unitType = "aircraft";
							}
	    				}
	    				
	    				this.scene.data.list['selectedUnitType'] = unitType; // Change the selected unit type.
	    				if (unitType) { old_tile.changeUnitDisplayOrder(unit.type); }
	    				return; // Prevent further execution of code.
	    			}
	    			
	    			// Move unit to the new hex if a unit does not exist there.
	    			if ( tile.units.infantry.length == 0 || tile.units.vehicle.length == 0 || tile.units.aircraft.length == 0 || tile.units.naval.length == 0) {
	    				
	    				// If a unit type exists, transfer unit to the new tile.
	    				if (unitType) {
	    					let unitArray = old_tile.units[unitType];
		    				old_tile.transferUnit( unitArray[0], tile );
		    				tile.changeUnitDisplayOrder(unitType);
	    				}
	    			}
	    			
	    			// If a unit does exist and is owned by the same unit, merge them together.
	    			else if ( tile.units.infantry[0].faction === this.scene.data.list['activeFaction'] && this.scene.data.list['selectedHex'] !== this ) {
	    				let old_tile = this.scene.data.list['selectedHex'];
	    				let selectedUnitType = this.scene.data.list['selectedUnitType'];
	    				
	    				let unit = tile.units[selectedUnitType][0];
	    				let old_unit = old_tile.units[selectedUnitType][0];
	    				
	    				unit.mergeWithUnit( old_unit );
	    				tile.updateGUIDisplay();
	    				tile.changeUnitDisplayOrder(unit.type);
	    			}
	    			
	    			// Change mode to view if there are no units on the old tile.
	    			if ( old_tile.units.infantry.length == 0 && old_tile.units.vehicle.length == 0 && old_tile.units.aircraft.length == 0 && old_tile.units.naval.length == 0) { 
	    				this.emitter.emit('mode');
	    				this.scene.data.list['selectedHex'] = false;
	    				old_tile.dehighlight();
	    			}
	    			
	    			//If other units still exist on the selected tile, stay selected and select the next unit in the list.
	    			else  {
	    				
	    				// Find which unit to change the selected unit type to.
	    				if ( unitType === 'infantry' ) {
		    				if ( old_tile.units.vehicle.length > 0 ) {
		    					unitType = "vehicle";
							}
		    				else if ( old_tile.units.aircraft.length > 0 ) {
		    					unitType = "aircraft";
							}
		    				else if ( old_tile.units.naval.length > 0 ) {
		    					unitType = "naval";
							}
	    				}
	    				else if ( unitType === 'vehicle' ) {
		    				if ( old_tile.units.aircraft.length > 0 ) {
		    					unitType = "aircraft";
							}
		    				else if ( old_tile.units.naval.length > 0 ) {
		    					unitType = "naval";
							}
		    				else if ( old_tile.units.infantry.length > 0 ) {
		    					unitType = "infantry";
		    				}
	    				}
	    				else if ( unitType === 'aircraft' ) {
		    				 if ( old_tile.units.naval.length > 0 ) {
		    					unitType = "naval";
							}
		    				else if ( old_tile.units.infantry.length > 0 ) {
		    					unitType = "infantry";
		    				}
		    				else if ( old_tile.units.vehicle.length > 0 ) {
		    					unitType = "vehicle";
							}
	    				}
	    				else if ( unitType === 'naval' ) {
		    				if ( old_tile.units.infantry.length > 0 ) {
		    					unitType = "infantry";
		    				}
		    				else if ( old_tile.units.vehicle.length > 0 ) {
		    					unitType = "vehicle";
							}
		    				else if ( old_tile.units.aircraft.length > 0 ) {
		    					unitType = "aircraft";
							}
	    				}
	    				
	    				this.scene.data.list['selectedUnitType'] = unitType; // Change the selected unit type.
	    			}
	    		}
	    		
    			// Right click in Move mode to cancel.
    			else if ( mouseClick ===3 && this.scene.data.list['mode'] === 'Move' ) {
    				let old_tile = this.scene.data.list['selectedHex']; // Retrieve the selected tile.
    				old_tile.dehighlight();
    				this.emitter.emit('mode');
    				this.scene.data.list['selectedHex'] = false;
    			}

	    		// On left click, add additional units.
	    		else if (mouseClick === 1 && this.scene.data.list['mode'] === 'Add') {
	    			
	    			// If the box doesn't have a unit, add it, otherwise remove it.
	    			if ( tile.units.infantry.length == 0) {
	    				let newUnit = new Infantry( this.scene.data.list['activeFaction'] );
	    				tile.addUnit(newUnit);
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
	    			}
	    		}
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
			for (let key in this.map.innerGUI) {
				
				// Check if child is an instance of a hextile.
				let child = this.map.innerGUI[key];
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