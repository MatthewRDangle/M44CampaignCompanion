const Data = require("../api/data");
import Tile from "./Tile.js";
import Faction from "./Faction.js";

export class Scenario {
    constructor(json) {
        this.devMode = false;

        // Scenario Defined Data
        this.factions = {};
        this.unit_templates = {};

        // Map Builder
        this.tiles = [];
        this.columns = 0;
        this.rows = 0;

        if (json) this.compile(json);
    }

    compile(raw) {

        // Set Unit Templates
        if (raw.unit_templates) {
            const unit_templates = raw.unit_templates
            for (let key in unit_templates) {
                const raw_template = unit_templates[key];
                this.unit_templates[key] = {
                    name: key,
                    health: raw_template.health,
                    available_movement: raw_template.available_movement,
                    movement_cap: raw_template.available_movement
                }
            }
        }

        // Set Factions
        if (Array.isArray(raw.factions)) {
            raw.factions.forEach((raw_faction) => {
                raw.factions[raw_faction.name] = new Faction(raw_faction.name, raw_faction.color);
            })
        }


        // This Columns
        this.columns = raw.columns;
        this.rows = raw.rows;

        // Construct Tiles
        const scenario_tiles_data = new Data(raw.tiles);
        const alphabet = ['A','B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        for (let idx_rows = 0; idx_rows < raw.rows + 1; idx_rows++) {
            for (let idx_columns = 1; idx_columns < raw.columns + 1; idx_columns++) {
                const tile = new Tile();

                // Set Tile ID.
                const id_series = Math.ceil(idx_columns / alphabet.length);
                const id_column = alphabet[(idx_columns - 1) % alphabet.length];
                tile.setId(id_series + '-' + id_column + '-' + (idx_rows + 1));

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
                if (raw.tiles && raw.tiles.hasOwnProperty(tile.id))
                    tile_instructions_data = scenario_tiles_data.navigate(tile.id);
                else if (raw.tiles && (raw.tiles.hasOwnProperty('*') || raw.tiles.hasOwnProperty('*-*')))
                    tile_instructions_data = scenario_tiles_data.navigate('*');
                tile.compile(tile_instructions_data.getValue(), this);

                // Push tile into scenario.
                if (!Array.isArray(this.tiles[idx_rows]))
                    this.tiles[idx_rows] = [];
                this.tiles[idx_rows].push(tile);
            }
        }
    }
}