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
	constructor(scene, emitter) {
		super(scene, emitter); // Import existing properties.
		
		// Create the Polygon.
		let w = 24;
		let h = 20;
		this.setDimensions(w*3, h*3);
		this.setBackgroundShape('polygon'); // TODO For some reason the shape needs to be built after the dimensions.
		this.setBackgroundColor(0xC5D6B7);
//		this.setBackgroundBorder(3, 0xFFFFFF);
	}
	
	/*
	 ** Title: Add Tile.
	 ** Description: renders and updates the tile.
	 */
	renTile () {
		
//		this.setBackgroundShape('hex');
//		this.setBackgroundColor(0xC5D6B7);
    	
//    	if (this.polygon) {
//    		return
//    	}
//    	
//    	this.polygon = this.scene.add.polygon(this.startX, this.startY, this.tileCords, this.fillColor);
//    	this.polygon.isStroked = true;
//    	this.polygon.lineWidth = 3;
//    	this.polygon.strokeColor = this.borderColor;
//    	this.polygon.setInteractive({useHandCursor: true});
//    	this.container.add(this.polygon);
//    	
//    	// Move the map with a mouse drag.
//    	this.scene.input.setDraggable(this.polygon);
//    	this.polygon.on('dragstart', function (pointer) {
//    		this.container.setData('x_start', this.container.x);
//    		this.container.setData('y_start', this.container.y);
//    	}, this);   
//    	this.polygon.on('drag', function (pointer, dragX, dragY) {
//        	let trueDragX = dragX - this.polygon.x;
//        	let trueDragY = dragY - this.polygon.y;
//      		this.container.x = this.container.getData('x_start') + trueDragX;
//    		this.container.y = this.container.getData('y_start') + trueDragY;
//        }, this);
//        
//    	this.polygon.on('pointerdown', function(event) {
//    		let mouseClick = event.event.which; // 1, 2 or 3 for a mouse click.
//    		
//    		// On left click, enter movement mode for a unit.
//    		if (mouseClick === 1 && this.scene.data.list['mode'] === 'View') {
//    			// Check if unit exists. If it does, enter movement mode. Otherwise, do nothing.
//    			if ( this.hasUnit() ) {
//    				this.scene.data.list['mode'] = 'Move';
//    				this.emitter.emit('changeMode');
//    				this.scene.data.list['selectedHex'] = this;
//    			}
//    		}
//    		
//    		// On left click while in movement mode, move the unit where it needs to go.
//    		else if (mouseClick === 1 && this.scene.data.list['mode'] === 'Move') {
//
//    			// Move unit to the new hex if a unit does not exist there.
//    			if ( !this.hasUnit() ) {
//    				
//    				// Transfer the unit to the new tile.
//    				let old_tile = this.scene.data.list['selectedHex'];
//    				old_tile.transferUnit(this);
//    				
//    				// Reset mode, deselect hex, and change unit to be inside new hex.
//    				this.scene.data.list['mode'] = 'View';
//    				this.emitter.emit('changeMode');
//    				this.scene.data.list['selectedHex'] = false;
//    			}
//    		}
//    
//    		// On right click, add or remove units.
//    		else if (mouseClick === 3 && this.scene.data.list['mode'] === 'Add') {
//    			
//    			// If the box doesn't have a unit, add it.
//    			if ( !this.hasUnit() ) {
//    				this.addUnit();
//    			}
//    			
//    			// If it has a unit, remove it.
//    			else {
//    				this.removeUnit();
//    			}	
//    		}
//    	}, this);
    
		
	}
}