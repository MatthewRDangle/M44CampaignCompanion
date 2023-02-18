import Tile from "./Tile.js";
import Faction from "./Faction.js";
import Unit from "./Unit.js";
import Terrain from "./Terrain.js";
import BattleMap from "./BattleMap.js";
import Script from "./Script.js";

export default class ScenarioDefinition {
    constructor() {
        // Development
        this.UUID = undefined;
        this.devMode = false;

        // References
        this.scripts = {
            end_of_turn: []
        };
        this.factions = {};

        // Templates
        this.unit_templates = {};
        this.overlays = {};
        this.terrains = {};
        this.battleMaps = {};

        // Gameplay
        this.turnCounter = 1;
        this.turnOrder = [];
        this.currentTurn = undefined;
        this.contests = [];
        this.unitsThatMoved = [];
        this.selectedTile = undefined;
        this.selectedUnit = undefined;
        this.isGameOver = false;

        // Grid Builder
        this.columns = 0;
        this.rows = 0;
        this.tiles = [];
    }

    appendContest(tile) {
        if (tile instanceof Tile && !this.contests.includes(tile))
            this.contests.push(tile);
    }

    compile(definition) {
        this.devMode = !!definition.devMode;

        /*
        * ===================================
        * ======== Compile References =======
        * ===================================
        */

        // Set Factions
        if (Array.isArray(definition.factions)) {
            definition.factions.forEach((definition_faction) => {
                const newFaction = new Faction();
                newFaction.compile(definition_faction);
                this.factions[definition_faction.name] = newFaction;
            })
        }

        // Set Overlays
        if (Array.isArray(definition.overlays)) {
            definition.overlays.forEach((definition_overlay) => {
                const newOverlay = newOverlay();
                newOverlay.compile(definition_overlay);
                this.overlays[definition_overlay.name] = newOverlay;
            })
        }

        // Set Terrains
        if (Array.isArray(definition.terrains)) {
            definition.terrains.forEach((definition_terrain) => {
                const newTerrain = new Terrain();
                newTerrain.compile(definition_terrain);
                this.terrains[definition_terrain.name] = newTerrain;
            })
        }

        // Set Battle Maps
        if (definition.battleMaps) {
            definition.battleMaps.forEach((definition_battleMap) => {
                this.battleMaps[definition_battleMap.name] = new BattleMap(definition_battleMap.name, definition_battleMap.src, definition_battleMap.alt);
            })
        }


        /*
        * ===================================
        * ======== Compile Templates ========
        * ===================================
        */

        // Set Units
        if (definition.unit_templates) {
            const unit_templates = definition.unit_templates
            for (let key in unit_templates) {
                let unit_definition_template = {...unit_templates[key]};
                unit_definition_template.name = key;
                this.unit_templates[key] = unit_definition_template;
            }
        }


        /*
        * ===================================
        * =========== Compile Gameplay ==========
        * ===================================
        */

        // Set Turn Order.
        if (Array.isArray(definition.turnOrder))
            this.turnOrder = definition.turnOrder;

        // Set Current Turn.
        if (typeof definition.currentTurn === 'string')
            this.currentTurn = this.factions[definition.currentTurn];
        else {

            // If no current turn is found. Loop through all factions to search for the first current turn indicator.
            let firstFactionInList; // Used later as a last ditch failsafe.
            Object.values(this.factions).forEach((faction, index) => {
                if (index === 0) firstFactionInList = faction;
                if (faction.currentTurn)
                    this.currentTurn = faction;
            })

            if (!!this.currentTurn) {

                // Still none... use first faction in turn order.
                if (typeof this.turnOrder[0] === 'string' && this.factions[this.turnOrder[0]] instanceof Faction)
                    this.currentTurn = this.factions[this.turnOrder[0]];

                // Still no current turn ? grab first faction available. No faction available, then error.
                else if (!!firstFactionInList)
                    this.currentTurn = firstFactionInList;
                else
                    throw Error('No factions available to configure scenario. Please add factions.');
            }

        }


        /*
        * ===================================
        * =========== Compile Grid ==========
        * ===================================
        */

        // This Column and Row Count.
        this.columns = definition.columns;
        this.rows = definition.rows;

        // Construct Tiles
        for (let idx_rows = 1; idx_rows < Number(definition.rows) + 1; idx_rows++) {
            for (let idx_columns = 1; idx_columns < Number(definition.columns) + 1; idx_columns++) {
                const tile = new Tile();

                // Set Tile ID and Adjacent Tiles.
                tile.setId(idx_rows, idx_columns);
                tile.generateAdjacentTiles();

                // Set the State of the Tile.
                let tile_definition;
                if (definition.tiles) {
                    if (definition.tiles.hasOwnProperty('*')) {
                        tile_definition = definition.tiles['*'];
                        tile.compile(tile_definition, this);
                    }
                    if (!!definition.tiles[`${tile.row}-`]) {
                        const epic_definition = definition.tiles[`${tile.row}-`];
                        Object.entries(epic_definition).forEach(([key, value]) => {
                            const columns = key.replaceAll(' ', '').split(',');
                            if (columns.includes(`${tile.column}`))
                                tile.compile(value, this)
                        })
                    }
                    if (!!definition.tiles[`-${tile.column}`]) {
                        const epic_definition = definition.tiles[`-${tile.column}`];
                        Object.entries(epic_definition).forEach(([key, value]) => {
                            const rows = key.replaceAll(' ', '').split(',');
                            if (rows.includes(`${tile.row}`))
                                tile.compile(value, this)
                        })
                    }
                    if (definition.tiles.hasOwnProperty(tile.id)) {
                        tile_definition = definition.tiles[tile.id];
                        tile.compile(tile_definition, this);
                    }
                }

                // Push tile into scenario.
                if (!this.tiles[idx_rows])
                    this.tiles[idx_rows] = {};
                this.tiles[idx_rows][tile.id] = tile;
            }
        }


        /*
        * ===================================
        * ========= Compile Scripts =========
        * ===================================
        */

        // Load Script Files.
        for (let rawScript of definition.scripts) {
            const script = new Script(this);
            script.compile(rawScript);
            this.scripts[script.when].push(script);
        }
    }

    factionsAreDefeated(factions) {
        for (let key in this.factions) {
            const faction = this.factions[key];
            if (factions.includes(faction))
                faction.isDefeated();
            else
                faction.isVictorious();
        }

        this.isGameOver = true;
    }

    factionsAreVictorious(factions) {
        for (let key in this.factions) {
            const faction = this.factions[key];
            if (factions.includes(faction))
                faction.isVictorious();
            else
                faction.isDefeated();
        }

        this.isGameOver = true;
    }

    nextTurn() {
        if (this.contests.length === 0) {

            // Run End of Turn Scripts
            if (!!this.scripts.end_of_turn)
                this.scripts.end_of_turn.forEach(script => script.run())

            // Initiate Next Factions Turn
            if (!this.isGameOver) {
                const idx = this.turnOrder.indexOf(this.currentTurn.name);
                const factionName = this.turnOrder[(idx + 1 < this.turnOrder.length) ? idx + 1 : 0];
                this.currentTurn = this.factions[factionName];
                this.replenishMoveUnits();
                this.unitsThatMoved = [];
                this.turnCounter++;
            }
        }
    }

    replenishMoveUnits() {
        this.unitsThatMoved.forEach((unit) => {
            unit.replenish();
        });
    }

    resolveContest(tile) {
        if (tile instanceof Tile)
            this.contests.splice(this.contests.indexOf(tile), 1);
    }

    setSelectedTile(tile) {
        if (tile instanceof Tile)
            this.selectedTile = tile;
        else
            this.selectedTile = undefined;
    }

    unitMoved(unit) {
        if (unit instanceof Unit && !this.unitsThatMoved.includes(unit))
            this.unitsThatMoved.push(unit);
    }
}