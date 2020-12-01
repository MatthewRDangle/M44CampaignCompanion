"use strict"; // Execute JavaScript file in strict mode.

class WarSim extends Phaser.Scene {
	
    constructor() {
        super('WarSim');
    }
    
    preload() {
    	
    	// Load start button.
    	this.load.image('GermanFlag', 'lib/assets/GermanFlag.png');
    	this.load.image('USAFlag', 'lib/assets/USAFlag.png');
    	this.load.image('FinishTurn', 'lib/assets/FinishTurn.png');
    	this.load.image('EndGame', 'lib/assets/EndGame.png');
    }
    
    create() {
    	// Create the game board to be rendered.
    	let gameboard = new Map(this, 24, 18, 5, 5);
    	
    	// Build the top bar.
    	let topBar = this.add.container(0,0);
		let tb_bck = this.add.rectangle(0, 0, window.innerWidth, 40, 0x151A1E);
		tb_bck.setOrigin(0, 0);
		topBar.add(tb_bck);
		let ww = this.add.text(10, 10, 'World War', { font: '16px Arial', fill: '#FFFFFF'} );
		topBar.add(ww);
		
		// Builds the stats bar. 0x151A1E
		let rightBar = this.add.container(window.innerWidth - 570, 40);
		let rb_bck = this.add.rectangle(0, 0, 570, window.innerHeight, 0x151A1E);
		rb_bck.setOrigin(0, 0);
		rightBar.add(rb_bck);

		let scenrio_bck = this.add.rectangle(5, 0, 560, 20, 0x404040);
		scenrio_bck.setOrigin(0,0);
		rightBar.add(scenrio_bck);
		let scenrio = this.add.text(220, 0, 'Operation Overlord', { font: '16px Arial', fill: '#FFFFFF'} );
		rightBar.add(scenrio);
		let scenrio_descr = this.add.text(120, 50, 'Capture the Airfields and hold them for one turn.', { font: '16px Arial', fill: '#FFFFFF'} );
		rightBar.add(scenrio_descr);
		
		let vsHeader_bck = this.add.rectangle(5, 170, 560, 20, 0x404040);
		vsHeader_bck.setOrigin(0,0);
		rightBar.add(vsHeader_bck);
		let vsHeader = this.add.text(260, 170, 'Armies', { font: '16px Arial', fill: '#FFFFFF'} );
		rightBar.add(vsHeader);
		
		let germanFlag = this.add.image(100, 230, 'GermanFlag');
		germanFlag.setOrigin(0, 0);
		rightBar.add(germanFlag);
		
		let usaFlag = this.add.image(350, 230, 'USAFlag');
		usaFlag.setOrigin(0, 0);
		rightBar.add(usaFlag);
		
		let bar = this.add.rectangle(75, 350, 430, 30, 0x3C5442);
		bar.setOrigin(0, 0);
		rightBar.add(bar);
		
		let finishTurn = this.add.image(210, 400, 'FinishTurn');
		finishTurn.setOrigin(0, 0);
		rightBar.add(finishTurn);
		
		// Add barrier to the left of the screen.
		let leftBar = this.add.container(0, 40);
		let lb_bck = this.add.rectangle(0, 0, 20, window.innerHeight - 40, 0x151A1E);
		lb_bck.setOrigin(0, 0);
		leftBar.add(lb_bck);
		
		// build bottom bar for exiting the game.
		let bottomBar = this.add.container(0, window.innerHeight - 100);
		let bb_bck = this.add.rectangle(0, 0, window.innerWidth, 100, 0x151A1E);
		bb_bck.setOrigin(0, 0);
		bottomBar.add(bb_bck);
		
		let EndGame = this.add.image(5, 5, 'EndGame');
		EndGame.setOrigin(0, 0);
		bottomBar.add(EndGame);
    }
}