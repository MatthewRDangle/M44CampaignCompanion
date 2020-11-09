"use strict"; // Execute JavaScript file in strict mode.

//Configures the game options and loads it into the window.
function gameLoader() {
	let g = game.init(); // Initialize the Game.
}

/*
 * -----------------------------------------
 * ----------- Game API Library. -----------
 * -----------------------------------------
 * Creates a globally accessible library.
 */

// Protect the function scope.
let game = {};
(function() {

	/*
	 * Property: Init.
	 * Type: Method.
	 * Description: Initizlizing the game.
	 * 
	 * @return Phaser.Game - Object - Always
	 */
	game.init = function() {
		
		// Create the game via Phaser.
		let g = new Phaser.Game({
			dom: { parent: 'Game' },
			title: game.properties.name,
			version: game.properties.version.major  + '.' + game.properties.version.minor + '.' + game.properties.version.patch,
			parent: game.properties.dom,
			url: '',
			type: Phaser.AUTO,
			width: window.innerWidth * window.devicePixelRatio,
			height: window.innerHeight * window.devicePixelRatio,
			disableContextMenu: true,
			scene: [WarSim]
		});
		
		// Make game responsive.
		window.addEventListener("resize", () => {
		  let width = window.innerWidth * window.devicePixelRatio;
		  let height = window.innerHeight * window.devicePixelRatio;
		  g.scale.resize(width, height);
		  g.scene.scenes.forEach(function (scene) {
		    scene.cameras.main.setViewport(0, 0, width, height);
		  });
		},false);
		
		// Return game object.
		return g;
	}
	
	/*
	 * Function: Init.
	 * Type: Properties.
	 * Description: Storage for global game information.
	 */
	game.properties = {
		name: 'Memoir 44: World War',
		version: {major: '1', minor: '0', patch: '0'},
		dom: document.getElementById('Game')
	}
}());

gameLoader(); // Initiate the game.