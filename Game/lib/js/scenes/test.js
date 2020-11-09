"use strict"; // Execute JavaScript file in strict mode.

// Configures the game options and loads it into the window.
function gameLoader() {
		
	// Create a phaser III game object.
	let config = {
		dom: { parent: 'Game' },
		title: "Memoir 44",
		version: "1.0.0",
		parent: 'Game',
		url: '',
		type: Phaser.AUTO,
		width: window.innerWidth * window.devicePixelRatio,
		height: window.innerHeight * window.devicePixelRatio,
		disableContextMenu: true,
		
		scene: {
			preload: preload,
			create: create,
			update: update
		}
	}
	let game = new Phaser.Game(config);
	
	// In case the user resizes the window afterwards
	window.addEventListener("resize", () => {
	  let width = window.innerWidth * window.devicePixelRatio;
	  let height = window.innerHeight * window.devicePixelRatio;
	  game.scale.resize(width, height);
	  game.scene.scenes.forEach(function (scene) {
	    scene.cameras.main.setViewport(0, 0, width, height);
	  });
	},false);
	
	
	// What happens before loading the game.
	function preload() {}
	
	// What happens what the game is created.
	function create() {}
	
	// What happens when the game is updated.
	function update() {}
}
gameLoader(); // Initiate the game.