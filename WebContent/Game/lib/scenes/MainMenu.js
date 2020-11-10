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
    	this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'start_btn');
    }
    update() {}
}