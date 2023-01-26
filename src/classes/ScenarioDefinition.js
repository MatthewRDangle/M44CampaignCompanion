import Tile from "./Tile.js";
import Faction from "./Faction.js";
import Unit from "./Unit.js";
import Terrain from "./Terrain.js";
import BattleMap from "./BattleMap.js";
import Session from "./Session.js";
import Script from "./Script.js";
import scenarioDefinitionStore from "../stores/ScenarioDefinition.store";

export default class ScenarioDefinition {
    async constructor(definition) {
        // Development
        this.UUID = undefined;
        this.devMode = false;

        // Session
        this.session = new Session();

        // References
        this.scripts = {};
        this.factions = {};

        // Templates
        this.unit_templates = {};
        this.terrains = {};
        this.battleMaps = {};

        // Gameplay
        this.turnOrder = [];
        this.currentTurn = undefined;
        this.contests = [];
        this.unitsThatMoved = [];
        this.selectedTile = undefined;
        this.selectedUnit = undefined;

        // Grid Builder
        this.columns = 0;
        this.rows = 0;
        this.tiles = [];

        if (definition) await this.compile(definition);
    }

    appendContest(tile) {
        if (tile instanceof Tile)
            this.contests.push(tile);
    }

    async compile(definition) {

        /*
        * ===================================
        * ======== Compile References =======
        * ===================================
        */

        // Set Factions
        if (Array.isArray(definition.factions)) {
            definition.factions.forEach((definition_faction) => {
                this.factions[definition_faction.name] = new Faction(definition_faction.name, definition_faction);
            })
        }

        // Set Terrains
        if (Array.isArray(definition.terrains)) {
            definition.terrains.forEach((definition_terrain) => {
                this.terrains[definition_terrain.name] = new Terrain(definition_terrain);
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
        if (!!definition.scripts) {
            const rawScripts = await scenarioDefinitionStore.getContentsFromScenarioDefinitionFile(definition.scripts);
            for (let rawScript of rawScripts) {
                const script = new Script(rawScript);
                script.scenarioDefinition = this;
                this.scripts[script.name] = script;
            }
        }
    }

    nextTurn() {
        if (this.contests.length === 0) {
            const idx = this.turnOrder.indexOf(this.currentTurn.name);
            const factionName = this.turnOrder[(idx + 1 < this.turnOrder.length) ? idx + 1 : 0];
            this.currentTurn = this.factions[factionName];
            this.replenishMoveUnits();
            this.unitsThatMoved = [];
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