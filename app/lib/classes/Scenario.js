const Data = require("../api/data");
import Tile from "./Tile.js";
import Faction from "./Faction.js";

export default class Scenario {
    constructor(json) {
        this.devMode = false;

        // Scenario Defined Data
        this.factions = {};
        this.unit_templates = {};

        // Map Builder
        this.tiles = [];
        this.columns = 0;
        this.rows = 0;

        // Status Info
        this.currentTurn = undefined;
        this.selectedTile = undefined;
        this.selectedUnit = undefined;

        if (json) this.compile(json);
    }

    compile(definition) {

        // Set Unit Templates
        if (definition.unit_templates) {
            const unit_templates = definition.unit_templates
            for (let key in unit_templates) {
                let unit_definition_template = {...unit_templates[key]};
                unit_definition_template.name = key;
                this.unit_templates[key] = unit_definition_template;
            }
        }

        // Set Factions
        if (Array.isArray(definition.factions)) {
            definition.factions.forEach((definition_faction) => {
                this.factions[definition_faction.name] = new Faction(definition_faction.name, definition_faction);
            })
        }

        // Set Current Turn.
        if (typeof definition.currentTurn === 'string')
            this.currentTurn = this.factions[definition.currentTurn];
        else {
            let firstFactionInList; // Used later as failsafe.

            // If no current turn is found. Loop through all factions to search for the first current turn indicator.
            Object.values(this.factions).forEach((faction, index) => {
                if (index === 0) firstFactionInList = faction;
                if (faction.currentTurn)
                    this.currentTurn = faction;
            })

            // Still no current turn ? grab first faction available. No faction available, then error.
            if (!!firstFactionInList)
                this.currentTurn = firstFactionInList;
            else
                throw Error('No factions available to configure scenario. Please add factions.');

        }

        // This Column and Row Count.
        this.columns = definition.columns;
        this.rows = definition.rows;

        // Construct Tiles
        const scenario_tiles_data = new Data(definition.tiles);
        const alphabet = ['A','B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        for (let idx_rows = 0; idx_rows < definition.rows + 1; idx_rows++) {
            for (let idx_columns = 1; idx_columns < definition.columns + 1; idx_columns++) {
                const tile = new Tile();

                // Set Tile ID.
                const id_series = Math.ceil(idx_columns / alphabet.length);
                const id_column = alphabet[(idx_columns - 1) % alphabet.length];
                tile.setId(id_series + '-' + id_column + '-' + (idx_rows + 1));
                tile.setRow(idx_rows);

                // Get Adjacent ID's.
                let previous_column = alphabet[ (idx_columns - 2) % alphabet.length ];
                let previous_series = Math.ceil((idx_columns - 1) / alphabet.length);
                let current_row = idx_rows + 1;
                let current_column = id_column;
                let current_series = id_series;
                let next_column = alphabet[ (idx_columns) % alphabet.length ]
                let next_series = Math.ceil((idx_columns) / alphabet.length);
                let adj_row = (idx_columns % 2) ? idx_rows + 2 : idx_rows;
                tile.adjacentTiles.push(previous_series + '-' + previous_column + '-' + current_row); // Left
                tile.adjacentTiles.push(previous_series + '-' + previous_column + '-' + adj_row); // Left
                tile.adjacentTiles.push(current_series + '-' + current_column + '-' + (current_row - 1)); // Middle
                tile.adjacentTiles.push(current_series + '-' + current_column + '-' + (current_row + 1)); // Middle
                tile.adjacentTiles.push(next_series + '-' + next_column + '-' + current_row); // Right
                tile.adjacentTiles.push(next_series + '-' + next_column + '-' + adj_row); // Right

                // Set the State of the Tile.
                let tile_instructions_data;
                if (definition.tiles && definition.tiles.hasOwnProperty(tile.id)) {
                    tile_instructions_data = scenario_tiles_data.navigate(tile.id);
                    tile.compile(tile_instructions_data.getValue(), this);
                }
                else if (definition.tiles && (definition.tiles.hasOwnProperty('*') || definition.tiles.hasOwnProperty('*-*'))) {
                    tile_instructions_data = scenario_tiles_data.navigate('*');
                    tile.compile(tile_instructions_data.getValue(), this);
                }

                // Push tile into scenario.
                if (!this.tiles[idx_rows])
                    this.tiles[idx_rows] = {};
                this.tiles[idx_rows][tile.id] = tile;
            }
        }
    }

    setSelectedTile(tile) {
        if (tile instanceof Tile)
            this.selectedTile = tile;
    }
}