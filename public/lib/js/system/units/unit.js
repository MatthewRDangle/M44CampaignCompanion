"use strict"; // Execute JavaScript file in strict mode.

/*
 ** Title: ???.
 ** Description: ???.
 */
class Unit {
	
	constructor(owner) {
		
		// Display Data.
		this.name = "Unit";
		this.type = "Generic";
		
		// State Data.
		this.health = 1; // This is the amount of "token" the player may place on the board of this type.
		this.movement = 0;
		this.maxMovement = 0;
		this.howMove = undefined;
		
		// Faction Information
		this.faction = owner; // AKA the owner/commander of this unit.
		
		// Object Relationship Information.
		this.map = undefined;
		this.tile = undefined;
		this.gui = undefined;
	}
	
	/*
	 ** Title: Attach Tile.
	 ** Description: ???
	 */
	attachTile(tile) {
		if (tile)
			this.tile = tile;
	}
	
	/*
	 ** Title: Attach GUI.
	 ** Description: ???
	 */
	attachGUI(gui) {
		if (gui)
			this.gui = gui;
	}
	
	/*
	 ** Title: De-select.
	 ** Description: ???
	 */
	deselect() {
	
		// Only deselect this unit if it currently is selected.
		if (this.gui.scene.data.list['selectedUnit'] === this) {
			
			// Only deselect this unit if a GUI exists; it is impossible to deselect it otherwise / there is no need to deselect it otherwise.
			if ( this.gui ) {
				this.gui.scene.data.list['selectedUnit'] = this;
				this.gui.scene.data.list['selectedUnitType'] = this.type;
				
				// If a tile is attached to this GUI. Deselect it as well.
				if (this.tile instanceof HexTile) {
					this.tile.deselect();
					
    				// Delight within move range tiles.
    				let acceptableTiles = this.gui.scene.data.list['acceptableTiles'];
    				for (let tileID in acceptableTiles) {
    					let acceptableTile = acceptableTiles[tileID].hexTile;
    					acceptableTile.setBackgroundColor( game.colors.tan );
    				}
				}
			}	
		}
	}
	
	/*
	 ** Title: Make GUI Invisible.
	 ** Description: ???
	 */
	makeGUIinvisible() {
		this.gui.setBackgroundAlpha(0);
	}
	
	/*
	 ** Title: Make GUI Visible.
	 ** Description: ???
	 */
	makeGUIvisible() {
		this.gui.setBackgroundAlpha(1);
	}

	/*
	 ** Title: Merge With Unit.
	 ** Description: ???
	 */
	mergeWithUnit(unit) {
		unit.deselect();
		
		if (unit instanceof Unit) {
			this.health = this.health + unit.health; // Add the two health values together.
			
			// The new movement speed will be the lesser value of the two units.
			if (unit.movement < this.movement) {
				this.movement = unit.movement;
			}
			
			// The new max movement speed will be the lesser of the two.
			if (unit.maxMovement < this.maxMovement) {
				this.maxMovement = unit.maxMovement;
			}
			
			// Remove unit from the board.
			unit.tile.removeUnit(unit);
		}
		else {
			throw Error('Unable to merge unit. "unit" argument does not exist.');
		}
	}
	
	/*
	 ** Title: Merge With Unit.
	 ** Description: ???
	 */
	moveToTile(tile) {
		if (tile instanceof HexTile && this.tile instanceof HexTile) {
			this.deselect();
			this.tile.dehighlight();
			this.tile.transferUnit(this, tile);
			
			// Add Unit to movedUnits Index for refresh.
			if ( !this.gui.scene.data.list['movedUnits'].includes( this ) ) {
				this.gui.scene.data.list['movedUnits'].push( this );
			}
		}
	}
	
	/*
	 ** Title: Refresh.
	 ** Description: ???
	 */
	refresh() {
		debugger;
		this.movement = this.maxMovement;
	}
	
	/*
	 ** Title: Reduce Movement By.
	 ** Description: ???
	 */
	reduceMovementBy(number) {
		if (typeof number === 'number') {
			
			// Reduce the movement by the  number. If it falls below 0, set it equal 0.
			this.movement = this.movement - number;
			if (this.movement < 0)
				this.movement = 0;	
		}
		else {
			throw Error('Unable to calculate new available movement without a number.');
		}
		
	}
	
	/*
	 ** Title: Select.
	 ** Description: ???
	 */
	select() {
		
		// Only select this unit if a GUI exists; it is impossible to select it otherwise / there is no need to select it otherwise.
		if ( this.gui ) {
			this.gui.scene.data.list['selectedUnit'] = this;
			this.gui.scene.data.list['selectedUnitType'] = this.type;
			
			// If a tile is attached to this GUI. Select it as well. Then enable move mode.
			if (this.tile instanceof HexTile) {
				this.tile.select();

				// Highlight all tiles within move range.
				let acceptableTiles = this.tile.retrieveHexWithinDistance(this.movement, this.howMove, [this.tile.id]);
				this.gui.scene.data.list['acceptableTiles'] = acceptableTiles; // Save to loop through later.
				for (let tileID in acceptableTiles) {
					let acceptableTile = acceptableTiles[tileID].hexTile;
					acceptableTile.setBackgroundColor( game.colors.blue ); // Turn blue to signify move is okay.
				}
			}
		}
	}
}