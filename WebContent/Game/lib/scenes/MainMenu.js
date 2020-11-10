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

    	// Insert the Start Button.
    	let startGameBtn = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'start_btn');
    	startGameBtn.setInteractive({useHandCursor: true});
    	startGameBtn.on('pointerdown', function (event) {
    		this.game.canvas.style.cursor = "default";
            this.scene.switch('WarSim');
        }, this);
    }
    update() {}
}