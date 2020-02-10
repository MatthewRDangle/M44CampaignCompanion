/*
 * -----------------------------------------
 * -------- Initialize The Project. --------
 * -----------------------------------------
 * Starts the application create the initial library pull and render display.
 */

// Protect the function scope.
// Function is called at the end of the document to ensure the entire document has loaded.
function gameLoader() {
	
	// Retrieve game container.
	let gameDOM = game.DOM.base;
	
	// Build a grid.
	let hexaGrid = game.webcomp.grid;
	m.render(gameDOM, hexaGrid);
}

/*
 * -----------------------------------------
 * -------- Initialize The Project. --------
 * -----------------------------------------
 * Creates a globally accessible library.
 */


// Protect the function scope.
let game = {};
(function() {

	/*
	 * Library: DOM.
	 * For: Game.
	 * Description: Houses and controls the HTML core DOM elements.
	 */
	game.DOM = {
		
		/*
		 * Title: Base.
		 * For: DOM.
		 * Description: The base for the application.
		 */
		base: document.getElementById("Game")
	}
	
	/*
	 * Library: Web Components.
	 * For: Game.
	 * Description. Reuseable JS UI pieces.
	 */
	game.webcomp = {
			
			/*
			 * Title: Grid.
			 * For: Web Components.
			 * Description: ...
			 */
			grid: (function() {
				
				let grid = m('div', {class: 'grid'}, [
					m('div', {class: 'grid_row'}, [
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
					]),
					m('div', {class: 'grid_row'}, [
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						)
					]),
					m('div', {class: 'grid_row'}, [
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
					]),
					m('div', {class: 'grid_row'}, [
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						)
					]),
					m('div', {class: 'grid_row'}, [
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
					]),
					m('div', {class: 'grid_row'}, [
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						)
					]),
					m('div', {class: 'grid_row'}, [
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
					]),
					m('div', {class: 'grid_row'}, [
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						)
					]),
					m('div', {class: 'grid_row'}, [
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
					]),
					m('div', {class: 'grid_row'}, [
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						)
					]),
					m('div', {class: 'grid_row'}, [
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
					]),
					m('div', {class: 'grid_row'}, [
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						)
					]),
					m('div', {class: 'grid_row'}, [
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
						m('div', {class: 'grid_row_space'},
							m('div', {class: 'grid_row_space_hexa'})
						),
					])
				]);
				
				return grid;
			}()),
			
			/*
			 * Title: Unit Marker.
			 * For: Web Components.
			 * Description: The unit market on the field.
			 */
			unitMarket: (function() {
				// Insert JS Here.
			}())
	}
}());

// Load the game after all critical components have loaded.
gameLoader();