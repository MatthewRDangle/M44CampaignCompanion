"use strict"; // Execute JavaScript file in strict mode.

class WarSim extends Phaser.Scene {
	
    constructor() {
        super('WarSim');
    }
    
    create() {
    	// Create the game board to be rendered.
    	let gameboard = new Map(this, 24, 18, 5, 5);
    	let ww = this.add.text(10, 10, 'World War', { font: '16px Arial', fill: '#FFFFFF'} );
    }
}