"use strict"; // Execute JavaScript file in strict mode.

class WarSim extends Phaser.Scene {
	
    constructor() {
        super('WarSim');
    }
    
    preload() {
    	// Load Scenario JSON.
    	this.load.json('scenarioJSON', 'lib/scenarios/overlord.json');

    	// Structures.
    	this.load.image('Neutral_Encampment', 'lib/assets/Encampment.png');
    	this.load.image('Neutral_Airbase', 'lib/assets/Airbase.png');
    	
    	// Units.
    	this.load.image('Friendly_Infantry', 'lib/assets/Green_Infantry.png');
    	this.load.image('Friendly_Vehicle', 'lib/assets/Green_Tank.png');
    	this.load.image('Friendly_Aircraft', 'lib/assets/Green_Plane.png');
    	this.load.image('Friendly_Naval', 'lib/assets/Green_Ship.png');
    	this.load.image('Enemy_Infantry', 'lib/assets/Red_Infantry.png');
    	this.load.image('Enemy_Vehicle', 'lib/assets/Red_Tank.png');
    	this.load.image('Enemy_Aircraft', 'lib/assets/Red_Plane.png');
    	this.load.image('Enemy_Naval', 'lib/assets/Red_Ship.png');
    	
    	// Markers.
    	this.load.image('Marker_Battle', 'lib/assets/Battle.png');
    	
    	// Buttons.
    	this.load.image('Battle', 'lib/assets/Battle.png');
    	this.load.image('FinishTurn', 'lib/assets/FinishTurn.png');
    	this.load.image('EndGame', 'lib/assets/EndGame.png');
    	
    	// Load Flags.
    	this.load.image('GermanFlag', 'lib/assets/GermanFlag.png');
    	this.load.image('USAFlag', 'lib/assets/USAFlag.png');
    }
    
    create() {
    	this.data.list['battleOverlay'] = undefined;
    	this.data.list['battleResults'] = undefined;
    	this.data.list['contestedTiles'] = [];
    	
    	// Create Game Object Handlers.
    	let scenarioDetails = new Scenario(this.cache.json.get('scenarioJSON'));
    	let emitter = new Phaser.Events.EventEmitter();
    	
    	// Make terrain global for later retrieval.
    	this.data.list['scenarioTerrain'] = scenarioDetails.terrain;
    	
    	// Faction Control.
    	let faction1 = new Faction(scenarioDetails.factions[0].name, scenarioDetails.factions[0].flag);
    	let faction2 = new Faction(scenarioDetails.factions[1].name, scenarioDetails.factions[1].flag);
    	
    	// Turn Control.
    	let faction_turn = 0;
    	this.data.list['activeFaction'] = faction1;
    	emitter.on("nextTurn", nextTurn, this);
    	
    	// Mode Control.
    	this.data.list['mode'] = 'View';
    	emitter.on("mode", swapMode, this);
    	emitter.on("moveMode", moveMode, this);
    	
    	
    	
    	
    	
    	// Game Background.
    	let gameBck = new GUI(this, emitter);
    	gameBck.setDimensions(window.innerWidth, window.innerHeight);
    	gameBck.setBackgroundColor( game.colors.black );
    	
    	// Build the top bar.
    	let topbar = new GUI(this, emitter);
    	topbar.setDimensions(window.innerWidth, 40);
    	topbar.setDepth(2);
    	topbar.setTextString('World War');
    	topbar.setPaddingLeft(15);
    	topbar.setTextAlign('left', 'middle');
    	topbar.setBackgroundColor(0x151A1E);
    	
		
		// Builds the right bar containing game information.
    	let rightbar = new GUI(this, emitter);
    	rightbar.setDimensions(570, window.innerHeight - topbar.height);
    	rightbar.setCords(window.innerWidth - rightbar.width, topbar.height, 2);
    	rightbar.setBackgroundColor(0x151A1E);
    	
    	// Scenario Details
    	let scenario = new GUI(this, emitter);
    	scenario.setCords(5, 0);
    	scenario.setWidth(rightbar.width - 10);
    	rightbar.addChild(scenario);
    	
    	// Scenario Header
    	let scenario_header = new GUI(this, emitter);
    	scenario_header.setDimensions(scenario.width, 30);
    	scenario_header.setBackgroundColor(0x404040);
    	scenario_header.setPadding(5, 5);
    	scenario_header.setTextString(scenarioDetails.name);
    	scenario_header.setTextAlign('center', 'middle');
    	scenario.addChild(scenario_header);
    	
    	// Scenario Description
    	let scenario_descr = new GUI(this, emitter);
    	scenario_descr.setCords(0, 30);
    	scenario_descr.setDimensions(scenario.width, 125);
    	scenario_descr.setPadding(10, 0);
    	scenario_descr.setTextAlign('center', 'middle');
    	scenario_descr.setTextString(scenarioDetails.mission);
    	scenario.addChild(scenario_descr);
    	
    	// Factions Details
    	let factions = new GUI(this, emitter);
    	factions.setCords(5, 160);
    	factions.setWidth(rightbar.width - 10);
    	rightbar.addChild(factions);
    	
    	// Factions Header
    	let factions_header = new GUI(this, emitter);
    	factions_header.setDimensions(factions.width, 30);
    	factions_header.setBackgroundColor(0x404040);
    	factions_header.setTextString('Armies');
    	factions_header.setTextAlign('center', 'middle');
    	factions.addChild(factions_header);
    	
    	// First Faction.
    	let first_faction = this.createFactionDisplay(factions, emitter, 1, scenarioDetails.factions[0].flag);
    	first_faction.setIsTurn(true);
    	factions.addChild(first_faction);
    	
       	// Second Faction.
    	let second_faction = this.createFactionDisplay(factions, emitter, 2, scenarioDetails.factions[1].flag);
    	factions.addChild(second_faction);
    	
    	// Strength Bar.
    	let strengthbar = new GUI(this, emitter);
    	strengthbar.setDimensions(430, 30);
    	strengthbar.setCords(rightbar.width / 2 - strengthbar.width / 2, 180);
    	strengthbar.setBackgroundColor(0x3C5442);
    	factions.addChild(strengthbar);
    	
    	// Finish Turn Button.
    	let finishturn = new GUI(this, emitter);
    	finishturn.setCords(factions.width / 2, 260);
    	finishturn.setBackgroundAlign('center', 'middle');
    	finishturn.onClick(function(e, x, y, a) {
    		emitter.emit('nextTurn');
    	});
    	finishturn.setBackgroundImage('FinishTurn'); // TODO for some reason, the image must be built last in order for the origins to be correctly set. Any redraw will cause it to break.
    	factions.addChild(finishturn);
		
		// Add barrier to the left of the screen.
    	let leftbar = new GUI(this, emitter);
    	leftbar.setDimensions(15, window.innerHeight - topbar.height);
    	leftbar.setCords(0, topbar.height);
    	leftbar.setDepth(2);
    	leftbar.setBackgroundColor(0x151A1E);
		
		// build bottom bar for exiting the game.
    	let bottombar = new GUI(this, emitter);
    	bottombar.setDimensions(window.innerWidth, 100);
    	bottombar.setCords(0, window.innerHeight - bottombar.height, 2);
    	bottombar.setDepth(2);
    	bottombar.setBackgroundColor(0x151A1E);
    	
    	// Build End Game Button.
    	let endgame = new GUI(this, emitter);
    	endgame.setCords(8, 5, 2);
    	endgame.setBackgroundImage('EndGame');
    	bottombar.addChild(endgame);
    	
    	// Enable DEV tools.
    	this.data.list['devTools'] = scenarioDetails.devTools;
    	
    	// Create the game board to be rendered.;
    	let gameboard = new GameBoard(this, emitter, scenarioDetails.width, scenarioDetails.height);
    	gameboard.setDimensions(window.innerWidth - leftbar.width - rightbar.width, window.innerHeight - topbar.height - bottombar.height);
		gameboard.updateMode(this.data.list['mode']);
		
		this.data.list['movedUnits'] = []; // Place holder for the map to insert moveUnits here.
		
		// Attach Pre-build Scenario Units.
		if (scenarioDetails.units) {
			for (let tileID in scenarioDetails.units) {
				let build_instructions = scenarioDetails.units[tileID]; // Retrieve the unit build instructions for a tile.
				if (build_instructions) {
					for (let factionName in build_instructions) {
						let faction_instruction = build_instructions[factionName];
						for (let unitType in faction_instruction) {
							let unitCount = faction_instruction[unitType];
							
							if ( factionName === faction1.name )
								gameboard.addUnit(tileID, unitType, unitCount, faction1); // Create the unit at the tile.
							else if (factionName === faction2.name )
								gameboard.addUnit(tileID, unitType, unitCount, faction2); // Create the unit at the tile.
						}
					}
				}
			}	
		}
		
		
    	
    	/*
    	 * Function: Next Turn
    	 * Description: Sets the next factions turn.
    	 */
    	function nextTurn() {
    		
    		if ( this.data.list['contestedTiles'].length > 0 )
    			return;
    		
    		// Turn Off Previous Player Turn.
    		if (faction_turn == 0)
    			first_faction.setIsTurn(false);
    		else
    			second_faction.setIsTurn(false);
    		
    		// Change Turn Counter
    		if (faction_turn + 1 == scenarioDetails.factions.length)
    			faction_turn = 0;
    		else
    			faction_turn =+ 1;
    		
    		// Turn On Previous Player Turn.
    		if (faction_turn == 0)
    			first_faction.setIsTurn(true);
    		else
    			second_faction.setIsTurn(true);

    		// Assign active faction.
    		if ( first_faction.isTurn )
    			this.data.list['activeFaction'] = faction1;
    		else if ( second_faction.isTurn )
    			this.data.list['activeFaction'] = faction2;

    		// Refresh unit movements.
    		let movedUnits = this.data.list['movedUnits'];
    		for (let idx = 0; idx < movedUnits.length; idx++) {
    			let unit = movedUnits[idx];
    			unit.refresh();
    			
    			// Remove unit from array.
    			let indexOfUnit = movedUnits.indexOf(unit);
    			movedUnits.splice( indexOfUnit, 1 );
    		}

    		// Update gameboard mode settings.
    		this.data.list['selectedHex'] = undefined;
    		this.data.list['mode'] = "View";
    		gameboard.updateMode(this.data.list['mode']);
    		
    		// Update the gameboard.
    		gameboard.updateBoard();
    	}
    	
    	/*
    	 * Function: Swap Mode
    	 * Description: Change the mode between view and add mode.
    	 */
    	function swapMode() {
    		if (this.data.list['mode'] === "View") {
    			if ( this.data.list['devTools'] ) {
        			this.data.list['mode'] = 'Add';
        			gameboard.updateMode(this.data.list['mode']);	
    			}
    		}
    		else if (this.data.list['mode'] === "Add") {
    			this.data.list['mode'] = "View";
    			gameboard.updateMode(this.data.list['mode']);
    		}
    		else if (this.data.list['mode'] === "Move") { 
    			this.data.list['mode'] = "View";
    			gameboard.updateMode(this.data.list['mode']);	
    		}
    	}
    	
    	/*
    	 * Function: Move Mode.
    	 * Description: ???
    	 */
		function moveMode() {
			this.data.list['mode'] = 'Move';
			gameboard.updateMode(this.data.list['mode']);
		}
    }
    
    // Create a faction display with GUI.
    createFactionDisplay(parent, emitter, n, flag) {
    	let xCord = (n == 2) ? parent.width / 2 : 0; // If this is the second faction display, set the offset value.
    	let star_w_offset = (n == 2) ? 100 : 60; // If this is the second faction display, set the offset value.
    	let flag_w_offset = (n == 2) ? 0 : 40; // If this is the second faction display, set the offset value.
    	return new FactionDisplay(this, emitter, parent, xCord, star_w_offset, flag_w_offset, flag);
    }
    
	/*
	 * Function: Build Battle Overlay.
	 * Description: ???
	 */
	buildBattleOverlay(emitter, tile) {

		// Set Attacker Units Object.
		let attackerUnits = {};
		for (let unitType in tile.units) {
			attackerUnits[unitType] = 0;
			
			// Retrieve the units from each unit type array, then find units owned by the attacking forces.
			let unitsArray = tile.units[unitType];
			for (let idx = 0; idx < unitsArray.length; idx++) {
				
				// If the unit is not owned by the tile occupant, it's the attacker.
				let unit = unitsArray[idx];
				if (tile.occupied !== unit.faction)
					attackerUnits[unitType] = attackerUnits[unitType] + unit.health;
			}
		}
		
		// Set Defender Units Object.
		let defenderUnits = {};
		for (let unitType in tile.units) {
			defenderUnits[unitType] = 0;
			
			// Retrieve the units from each unit type array, then find units owned by the attacking forces.
			let unitsArray = tile.units[unitType];
			for (let idx = 0; idx < unitsArray.length; idx++) {
				
				// If the unit is owned by the tile occupant, it's the defender.
				let unit = unitsArray[idx];
				if (tile.occupied === unit.faction)
					defenderUnits[unitType] = defenderUnits[unitType] + unit.health;
			}
		}
		
		// Attach the inputs to the battle results data object.
		this.data.list['battleResults'] = {
				attackerUnits,
				defenderUnits
		}
		
		// Build the overlay.
    	let overlay = new GUI(this, emitter);
    	overlay.setDimensions(window.innerWidth, window.innerHeight);
    	overlay.setDepth(5);
    	overlay.onClick( function() { /* Left Empty to Prevent Propagation.. */ } )
    	overlay.setBackgroundColor( game.colors.black );
    	this.data.list['battleOverlay'] = overlay;
    	
    	// Add Result Inputs
    	let attackerInputs = construct_resultDetails('attacker', this, emitter, attackerUnits);
    	let defenderInputs = construct_resultDetails('defender', this, emitter, defenderUnits);
    	overlay.addChild( attackerInputs );
    	overlay.addChild( defenderInputs );
    	
    	// Add Submit Results Button.
    	let submitBTN = new GUI(this, emitter);
    	submitBTN.setTextString('Submit Results');
    	submitBTN.setTextColor("#FFFFFF");
    	submitBTN.setDimensions(125, 50);
    	submitBTN.setTextAlign('center', 'middle');
       	submitBTN.setBackgroundColor(game.colors.blue);
       	submitBTN.setCords( window.innerWidth / 2 - submitBTN.width / 2,  window.innerHeight - submitBTN.height - 100 );
    	submitBTN.onClick( function() {
    		
    		// Retrieve results and update the objects.
    		let results = this.scene.data.list['battleResults'];
    		
    		// Retrieve total numbers for each.
    		let attackerSurvivors = 0;
    		let defenderSurvivors = 0;
    		
    		// Loop through the tile units and update each.
    		for ( let type in tile.units ) {
    			for (let ddx = 0; ddx < tile.units[type].length; ddx++) {
    				let unit = tile.units[type][ddx]; // Retrieve the unit.

    				// The faction who occupies the tile is the faction owner.
    				let defenderFactionName = tile.occupied.name;
    				if (unit.faction.name === defenderFactionName) {
    					unit.changeHealth( results.defenderUnits[type] );
    					defenderSurvivors = defenderSurvivors + results.defenderUnits[type];
    				}
    				else {
    					unit.changeHealth( results.attackerUnits[type] );
    					attackerSurvivors = attackerSurvivors + results.attackerUnits[type];
    				}
    			}
    		}
    		
    		// If the defenders have been defeated, resolve the contest on the tile, and change ownership to the attacking faction.
    		if ( defenderSurvivors === 0 ) {
    			tile.contestResolve( tile.contested.attacker  );
    			tile.updateGUIDisplay();
    		}
    		else if ( attackerSurvivors === 0 ) {
    			tile.contestResolve();
    			tile.updateGUIDisplay();
    		}
    		
    		// Close the overlay and empty the results.
    		this.scene.data.list['battleResults'] = undefined;
    		this.scene.closeBattleOverlay(); // Close the overlay.
    	} );
    	overlay.addChild(submitBTN);

    	// Construct a input.
    	function construct_resultInput(x, y, scene, emitter, type, who, unitCount) {

    		// Build the input.
    		let input = new GUI(scene, emitter);
        	input.setDimensions(100, 25);
        	input.setCords(x, y + 5);
        	input.setTextString(unitCount);
        	input.setTextAlign('center', 'middle');
        	input.setTextColor( game.colors.black );
        	input.setBackgroundColor( game.colors.white );
        	
        	// Up Arrow Buttom.
        	let upArrowBTN  = new GUI(scene, emitter);
        	upArrowBTN.setDimensions(20, input.height / 2 - 1);
        	upArrowBTN.setCords(input.width + 2, 0);
        	upArrowBTN.setBackgroundColor( game.colors.tan );
        	upArrowBTN.onClick(function() {
        		
        			if ( input.textString < unitCount ) {
            			let survivors = Number(input.textString) + 1;
        				input.setTextString( survivors ); // Update the textString.
            			
            			// Update the results object.
            			switch (who) {
            				case "attacker":
            					this.scene.data.list['battleResults'].attackerUnits[type] = survivors;
            					break;
            				case "defender":
            					this.scene.data.list['battleResults'].defenderUnits[type] = survivors;
            			}
        			}
        	});
        	
        	// UpTriangle.
        	let UpTriangle = new GUI(scene, emitter);
        	UpTriangle.setTextString('Up');
        	UpTriangle.setTextSize('10px');
        	UpTriangle.setTextAlign('center', 'middle');
        	UpTriangle.setTextColor( game.colors.black );
        	UpTriangle.setCords( upArrowBTN.width / 2, upArrowBTN.height / 2 )
        	upArrowBTN.addChild( UpTriangle );
        	
        	// Down Arrow Button.
        	let downArrowBTN = new GUI(scene, emitter);
        	downArrowBTN.setDimensions(20, input.height / 2 - 1);
        	downArrowBTN.setCords(input.width + 2, input.height / 2 + 1);
        	downArrowBTN.setBackgroundColor( game.colors.tan );
        	downArrowBTN.onClick(function() {
        		
        		if (input.textString > 0) {
        			let survivors = Number(input.textString) - 1;
        			input.setTextString( survivors ); // Update the textString.

        			// Update the results object.
        			switch (who) {
        				case "attacker":
        					this.scene.data.list['battleResults'].attackerUnits[type] = survivors;
        					break;
        				case "defender":
        					this.scene.data.list['battleResults'].defenderUnits[type] = survivors;
        			}
        		}
        	});
        	
        	// DownTriangle.
        	let DownTriangle = new GUI(scene, emitter);
        	DownTriangle.setTextString('Down');
        	DownTriangle.setTextColor( game.colors.black );
        	DownTriangle.setCords(downArrowBTN.width / 2, downArrowBTN.height / 2);
        	DownTriangle.setTextSize('10px');
        	DownTriangle.setTextAlign('center', 'middle');
        	downArrowBTN.addChild( DownTriangle );
        	
        	// Render Label.
        	let inLab = new GUI(scene, emitter);
        	inLab.setTextString('# ' + type + ' survived');
        	inLab.setTextVAlign('center');
        	inLab.setTextColor('#FFFFFF');
        	inLab.setHeight(input.height);
        	inLab.setCords(input.width + upArrowBTN.width + 10, 0);
        	
        	// Return Input.
        	input.addChild(upArrowBTN);
        	input.addChild(downArrowBTN);
        	input.addChild(inLab);
        	return input;
    	}
    	
    	// Constructs a results container full of inputs.
    	function construct_resultDetails(who, scene, emitter, unitsObject) {
    		
    		// Build Results Input.
        	let infantry_results = construct_resultInput(0, 0, scene, emitter, 'infantry', who, unitsObject.infantry);
        	let vehicle_results = construct_resultInput(0, infantry_results.y + infantry_results.height, scene, emitter, 'vehicle', who, unitsObject.vehicle);
        	let naval_results= construct_resultInput(0, vehicle_results.y + vehicle_results.height, scene, emitter, 'naval', who, unitsObject.naval);
        	let aircraft_results = construct_resultInput(0, naval_results.y + naval_results.height, scene, emitter, 'aircraft', who, unitsObject.aircraft);
        	
        	// Results Parent.
        	let results = new GUI(scene, emitter);
        	results.addChild(infantry_results);
        	results.addChild(vehicle_results);
        	results.addChild(naval_results);
        	results.addChild(aircraft_results);
        	
        	// Modify Cords.
    		if (who === 'attacker') {
            	results.setCords( window.innerWidth / 4 - 120 , window.innerHeight - (30 * 4) - 200); // 30 = size of input, 4 is the number of inputs. 50 is the offset.
    		}
    		else if (who === 'defender') {
    			results.setCords( window.innerWidth / 4 * 3 - 120 , window.innerHeight - (30 * 4) - 200); // 30 = size of input, 4 is the number of inputs. 50 is the offset.
    		}
        	
        	return results;
    	}
	}
	
	/*
	 * Function: Close Battle Overlay.
	 * Description: Close the overlay by destroy the GUI object and removing it from view.
	 */
	closeBattleOverlay() {
		this.data.list['battleOverlay'].destroy();
	}
}