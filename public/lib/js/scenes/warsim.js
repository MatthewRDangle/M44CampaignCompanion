"use strict"; // Execute JavaScript file in strict mode.

class WarSim extends Phaser.Scene {
	
    constructor() {
        super('WarSim');
    }
    
    preload() {
    	// Load Scenario JSON.
    	this.load.json('scenarioJSON', 'lib/scenarios/overlord.json');
    	
    	// Assets
    	this.load.image('FinishTurn', 'lib/assets/FinishTurn.png');
    	this.load.image('EndGame', 'lib/assets/EndGame.png');
    	
    	// Load Flags.
    	this.load.image('GermanFlag', 'lib/assets/GermanFlag.png');
    	this.load.image('USAFlag', 'lib/assets/USAFlag.png');
    }
    
    create() {
    	
    	// Create Game Object Handlers.
    	let scenarioDetails = new Scenario(this.cache.json.get('scenarioJSON'));
    	let emitter = new Phaser.Events.EventEmitter();
    	
    	// War Simulation Events.
    	let faction_turn = 0;
    	emitter.on("nextTurn", nextTurn, this);
    	
    	// Create the game board to be rendered.
    	let map = new Map(this, emitter, 10, 4);
    	map.setCords(0, 0);
    	
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
    	
    	
    	/*
    	 * Function: Next Turn
    	 * Description: Sets the next factions turn.
    	 */
    	function nextTurn() {
    		
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
    	}
    }
    
    // Create a faction display with GUI.
    createFactionDisplay(parent, emitter, n, flag) {
    	let xCord = (n == 2) ? parent.width / 2 : 0; // If this is the second faction display, set the offset value.
    	let star_w_offset = (n == 2) ? 100 : 60; // If this is the second faction display, set the offset value.
    	let flag_w_offset = (n == 2) ? 0 : 40; // If this is the second faction display, set the offset value.
    	return new FactionDisplay(this, emitter, parent, xCord, star_w_offset, flag_w_offset, flag);
    }
}