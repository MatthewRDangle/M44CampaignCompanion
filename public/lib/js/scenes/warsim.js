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
    	
    	// Create Base Object Handlers.
    	let emitter = new Phaser.Events.EventEmitter();
    	
    	// Create the game board to be rendered.
    	let gameboard = new Map(this, emitter, 24, 18, 5, 5);
    	
    	
    	// Build the top bar.
    	let topbar = new GUI(this, emitter);
    	topbar.setDimensions(window.innerWidth, 40);
    	topbar.setDepth(2);
    	topbar.setInteractive(true);
    	topbar.setTextString('World War');
    	topbar.setPadding(15, 10, 0, 0);
    	topbar.setBackgroundColor(0x151A1E);
    	
    	
		
		// Builds the right bar containing game information.
    	let rightbar = new GUI(this, emitter);
    	rightbar.setInteractive(true);
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
    	scenario_header.setTextString('Operation Overlord');
    	scenario.addChild(scenario_header);
    	
    	// Scenario Description
    	let scenario_descr = new GUI(this, emitter);
    	scenario_descr.setCords(0, 40);
    	scenario_descr.setPadding(5, 5);
    	scenario_descr.setTextString('Capture the Airfields and hold them for one turn.');
    	scenario.addChild(scenario_descr);
    	
    	// Factions Details
    	let factions = new GUI(this, emitter);
    	factions.setCords(5, 200);
    	factions.setWidth(rightbar.width - 10);
    	rightbar.addChild(factions);
    	
    	// Factions Header
    	let factions_header = new GUI(this, emitter);
    	factions_header.setDimensions(factions.width, 30);
    	factions_header.setBackgroundColor(0x404040);
    	factions_header.setPadding(5, 5);
    	factions_header.setTextString('Armies');
    	factions.addChild(factions_header);
    	
    	// First Faction.
    	let first_faction = new GUI(this, emitter);
    	first_faction.setCords(60, 60);
    	let first_faction_turnMarker = new GUI(this, emitter);
    	first_faction_turnMarker.setCords(0, 25);
    	first_faction_turnMarker.setDimensions(5, 10);
    	first_faction_turnMarker.setBackgroundShape('star');
    	first_faction_turnMarker.setBackgroundColor(0xFFFFFF);
    	first_faction.addChild(first_faction_turnMarker);
    	let first_faction_flag = new GUI(this, emitter);
    	first_faction_flag.setCords(40, 0);
    	first_faction_flag.setBackgroundImage('GermanFlag');
    	first_faction.addChild(first_faction_flag);
    	factions.addChild(first_faction);
    	
       	// Second Faction.
    	let sec_faction = new GUI(this, emitter);
    	sec_faction.setCords( rightbar.width / 4 * 2, 60);
    	let sec_faction_turnMarker = new GUI(this, emitter);
    	sec_faction_turnMarker.setCords(0, 25);
    	sec_faction_turnMarker.setDimensions(5, 10);
    	sec_faction_turnMarker.setBackgroundShape('star');
    	sec_faction_turnMarker.setBackgroundColor(0xFFFFFF);
    	sec_faction.addChild(sec_faction_turnMarker);
    	let sec_faction_flag = new GUI(this, emitter);
    	sec_faction_flag.setCords(40, 0);
    	sec_faction_flag.setBackgroundImage('USAFlag');
    	sec_faction.addChild(sec_faction_flag);
    	factions.addChild(sec_faction);
    	
    	// Strength Bar.
    	let strengthbar = new GUI(this, emitter);
    	strengthbar.setCords(60, 380);
    	strengthbar.setDimensions(430, 30);
    	strengthbar.setBackgroundColor(0x3C5442);
    	rightbar.addChild(strengthbar);
    	
    	// Finish Turn Button.
    	let finishturn = new GUI(this, emitter);
    	finishturn.setCords(200, 450);
    	finishturn.setBackgroundImage('FinishTurn');
    	rightbar.addChild(finishturn);
    	
    	
		
		// Add barrier to the left of the screen.
    	let leftbar = new GUI(this, emitter);
    	leftbar.setCords(0, topbar.height, 2);
    	leftbar.setDimensions(15, window.innerHeight - topbar.height);
    	leftbar.setInteractive(true);
    	leftbar.setBackgroundColor(0x151A1E);
		
		// build bottom bar for exiting the game.
    	let bottombar = new GUI(this, emitter);
    	bottombar.setDimensions(window.innerWidth, 100);
    	bottombar.setCords(0, window.innerHeight - bottombar.height, 2);
    	bottombar.setInteractive(true);
    	bottombar.depth = 2;
    	bottombar.setBackgroundColor(0x151A1E);
    	
    	// Build End Game Button.
    	let endgame = new GUI(this, emitter);
    	endgame.setCords(8, 5, 2);
    	endgame.setBackgroundImage('EndGame');
    	bottombar.addChild(endgame);
    }
}