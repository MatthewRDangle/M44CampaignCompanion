"use strict"; // Execute JavaScript file in strict mode.

/*
 ** Title: ???.
 ** Description: ???.
 */
class FactionDisplay extends GUI {
	
	constructor(scene, emitter, parent, xCord, star_w_offset, flag_w_offset, flag, isTurn) {
		super(scene, emitter); // Import existing properties.

		// Set location of this GUI.
    	this.setCords(xCord, 30);
    	this.setDimensions(parent.width / 2, 150);
//    	this.setBackgroundColor(0x000000);
    	
    	// Build the star turn marker.
    	this.faction_turnMarker = new GUI(scene, emitter);
    	this.faction_turnMarker.setCords(this.width / 2 - star_w_offset, this.height / 2 - 5);
    	this.faction_turnMarker.setDimensions(5, 10);
    	this.faction_turnMarker.setBackgroundAlign('center', 'middle');
    	this.faction_turnMarker.setBackgroundShape('star');
    	this.faction_turnMarker.setBackgroundColor(0xFFFFFF);
    	this.addChild(this.faction_turnMarker);
    	
    	// Build the Flag.
    	this.faction_flag = new GUI(scene, emitter);
    	this.faction_flag.setCords(this.width / 2 + flag_w_offset, this.height / 2);
    	this.faction_flag.setBackgroundAlign('center', 'middle');
    	this.faction_flag.setBackgroundImage(flag);
    	this.addChild(this.faction_flag);
    	
    	// Display Data.
    	this.isTurn = (isTurn) ? isTurn : false;
    	
    	this.setIsTurn(this.isTurn); // Modify the aesthetic based on the turn.
	}
	
	/*
	 ** Title: Is Turn
	 ** Description: Modifies the aesthetic of this GUI based on it's turn.
	 */
	setIsTurn(value) {
		if (value === true) {
			this.isTurn = true;
			this.faction_turnMarker.setBackgroundAlpha(1);
		}
		if (value === false) {
			this.isTurn = false;
			this.faction_turnMarker.setBackgroundAlpha(0.25);
		}
	}
}