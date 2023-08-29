import modeStore from "../../stores/Mode.store.js";
import Tile from "./Tile.model.js";
import Faction from "./Faction.model.js";
import Unit from "./Unit.model.js";
import Terrain from "./Terrain.model.js";
import Map from "./Map.model.js";
import Script from "./Script.model.js";
import Overlay from "./Overlay.model.js";
import Battle from "././Battle.model.js";
import Setup from "./Setup.model.js";

export default class Definition {
    constructor() {
        this.UUID = undefined;
        this.devMode = false;

        // References
        this.factions = {};
        this.overlays = {};
        this.terrains = {};
        this.battleMaps = {};
        this.setups = {};

        // Templates
        this.unit_templates = {};

        // Scripts
        this.scripts = {
            end_of_turn: []
        };

        // Gameplay
        this.turnCounter = 1;
        this.turnOrder = [];
        this.currentTurn = undefined;
        this.isGameOver = false;

        // Trackers
        this.trackers = {
            battles: [],
            unitMoves: []
        }

        // Grid Builder
        this.columns = 0;
        this.rows = 0;
        this.tiles = [];
    }

    get selectedTile() {
        return modeStore.selectedTile
    }

    get selectedUnit() {
        return modeStore.selectedUnit
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
                const newOverlay = new Overlay();
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
        if (Array.isArray(definition.battleMaps)) {
            definition.battleMaps.forEach((definition_battleMap) => {
                this.battleMaps[definition_battleMap.name] = new Map(definition_battleMap);
            })
        }

        // Set Setups
        if (Array.isArray(definition.setups)) {
            definition.setups.forEach((definition_setup) => {
                this.setups[definition_setup.name] = new Setup(definition_setup);
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

    fetchTileReferenceById(tileId) {
        const [row, column] = tileId.split('-');
        return this.tiles[row][tileId];
    }

    hideContextMenu() {
        this.showContextMenu = false;
    }

    nextTurn() {
        if (this.isGameOver) return

        if (this.trackers.battles.length !== 0) {
            alert('There are still battles to be fought.')
            return
        }

        const doEndTurn = confirm('Are you sure you would like to end your turn?')
        if (doEndTurn) {
            // Run End of Turn Scripts
            if (!!this.scripts.end_of_turn)
                this.scripts.end_of_turn.forEach(script => script.run())

            // Update Counter
            if (this.turnOrder.length === (this.turnOrder.indexOf(this.currentTurn.name) + 1))
                this.turnCounter = this.turnCounter + 1;

            // Initiate Next Factions Turn
            const idx = this.turnOrder.indexOf(this.currentTurn.name);
            const factionName = this.turnOrder[(idx + 1 < this.turnOrder.length) ? idx + 1 : 0];
            this.currentTurn = this.factions[factionName];
            this.replenishMoveUnits();
            this.trackers.unitMoves.length = 0;
            alert(`${this.currentTurn.name} start your turn!`)
        }
    }

    replenishMoveUnits() {
        this.trackers.unitMoves.forEach((unit) => {
            unit.replenish();
        });
    }

    selectTile(tile) {
        modeStore.selectTile(tile)
    }

    selectUnit(unit) {
        modeStore.selectUnit(unit)
    }

    trackBattle(battle) {
        if (battle instanceof Battle && !this.trackers.battles.includes(battle))
            this.trackers.battles.push(battle);
    }

    trackUnitMoved(unit) {
        if (unit instanceof Unit && !this.trackers.unitMoves.includes(unit))
            this.trackers.unitMoves.push(unit);
    }

    untrackBattle(battle) {
        if (battle instanceof Battle)
            this.trackers.battles.splice(this.trackers.battles.indexOf(battle), 1);
    }

    untrackUnitMoved(unit) {
        if (unit instanceof Unit)
            this.trackers.unitMoves.splice(this.trackers.unitMoves.indexOf(unit), 1);
    }
}