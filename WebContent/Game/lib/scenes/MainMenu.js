"use strict"; // Execute JavaScript file in strict mode.

class MainMenu extends Phaser.Scene {
	
    constructor() {
        super('MainMenu');
    }
    
    init() {
    	this.cursors = this.input.keyboard.createCursorKeys();
    }
    preload() {
    	
    	// Load start button.
    	this.load.image('start_btn', 'lib/assets/start_btn.png');
    }
    create() {
    	
    	// Insert the button.
    	this.add.image(0, 0, 'start_btn');
    }
    update() {}
}