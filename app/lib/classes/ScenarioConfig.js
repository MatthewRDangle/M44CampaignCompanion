const Data = require("../api/data");
import Tile from "./gui/pgui/tile.js";
import Terrain from "./terrain.js";
import {localData} from "../../localdata.js";
import Faction from "./faction.js";
import Unit from "./unit.js";

export default class ScenarioConfig {
    constructor(json) {
        if (!json || typeof json !== 'object')
            json = {};

        this.devMode = json.devMode || false;
        this.columns = json.columns || 1;
        this.rows = json.rows || 1;

        this.factions = json.factions || [];
        this.tiles = json.tiles || {};
    }

    constructTiles(scene, map) {
        const alphabet = ['A','B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        for (let idx_columns = 1; idx_columns < this.columns + 1; idx_columns++) {
            for (let idx_rows = 0; idx_rows < this.rows + 1; idx_rows++) {
                let tile = new Tile(scene, map);
                const alphabet_length = alphabet.length;
                const id_series = Math.ceil(idx_columns / alphabet_length);
                const id_column = alphabet[(idx_columns - 1) % alphabet_length];
                tile.setID(id_series + '-' + id_column + '-' + (idx_rows + 1));

                // Get Adjacent ID's.
                let previous_column = alphabet[ (idx_columns - 2) % alphabet_length ];
                let previous_series = Math.ceil((idx_columns - 1) / alphabet_length);
                let current_row = idx_rows + 1;
                let current_column = id_column;
                let current_series = id_series;
                let next_column = alphabet[ (idx_columns) % alphabet_length ]
                let next_series = Math.ceil((idx_columns) / alphabet_length);
                let adj_row = (idx_columns % 2) ? idx_rows + 2 : idx_rows;
                tile.adjacentTiles.push(previous_series + '-' + previous_column + '-' + current_row); // Left
                tile.adjacentTiles.push(previous_series + '-' + previous_column + '-' + adj_row); // Left
                tile.adjacentTiles.push(current_series + '-' + current_column + '-' + (current_row - 1)); // Middle
                tile.adjacentTiles.push(current_series + '-' + current_column + '-' + (current_row + 1)); // Middle
                tile.adjacentTiles.push(next_series + '-' + next_column + '-' + current_row); // Right
                tile.adjacentTiles.push(next_series + '-' + next_column + '-' + adj_row); // Right


                let state = {};
                state.geo = {
                    x: (idx_columns > 0) ? idx_columns * (tile.state.width * 0.75) : idx_columns * tile.state.width,
                    y: (idx_columns % 2 * (tile.state.height / 2)) + (idx_rows * tile.state.height),
                    z: 0
                };
                state.event = {
                    onclick: tile_onclick_handler(tile),
                    onmousescroll: tile_mouseWheel_handler(map, tile),
                    ondragstart: tile_onDragStart_handler(map, tile),
                    ondrag: tile_drag_handler(map)
                }

                if (this.devMode) {
                    state.textString = tile.id;
                    state.textHAlign = 'center';
                    state.textVAlign = 'middle';
                }

                const scenario_tiles_data = new Data(this.tiles);
                if (this.tiles && this.tiles.hasOwnProperty(tile.id)) {
                    const instructions_data = scenario_tiles_data.navigate(tile.id);
                    tile_scenario_api(tile, instructions_data, this);
                }
                else if (this.tiles && (this.tiles.hasOwnProperty('*') || this.tiles.hasOwnProperty('*-*'))) {
                    const instructions_data = scenario_tiles_data.navigate('*');
                    tile_scenario_api(tile, instructions_data, this);
                }

                tile.setTerrain(new Terrain());
                tile.setState(state);
                map.addChild(tile);
            }
        }
        return this.tiles;
    }
}

const tile_scenario_api = function(tile, instructions_data, config) {
    const instructions = instructions_data.getValue();
    const factions_list = config.factions;
    factions_list.forEach(function(faction_config) {
        localData.navigate('factions').addChild(faction_config.name, new Faction(faction_config.name, faction_config));
    });

    for (let key in instructions) {
        const factions_container = localData.navigate('factions').getValue();
        const faction = factions_container[key];
        if (faction) {
            const faction_instructions = instructions[key];
            for (let type in faction_instructions) {
                const count = faction_instructions[type];
                let unit = new Unit(faction);
                unit.health = count;
                unit.name = type;
                tile.addUnit(unit);
            }
        }
    }
}

const tile_onclick_handler = function(tile) {
    return (pointer) => {
        const mouse_event = pointer.event;
        const mouse_button = mouse_event.button;
        const selected_tile = localData.getValue('selected_tile');

        // Left Click.
        if (mouse_button === 0) {
            const viewMode = localData.getValue('viewMode');
            if (viewMode === 'view') {
                if (selected_tile instanceof Tile)
                    selected_tile.deselect();
                tile.select();
            }
            else if (viewMode === 'move') {
                const selected_unit = localData.getValue('selected_unit');
                selected_unit.moveTo(tile);
            }
        }

        // Middle Wheel Click
        else if (mouse_button === 1) {

        }

        // Right Click.
        else if (mouse_button === 2) {
            const viewMode = localData.getValue('viewMode');
            if (viewMode === 'move') {
                const selected_unit = localData.getValue('selected_unit');
                selected_unit.deselect();
            }
            else {
                if (selected_tile instanceof Tile)
                    selected_tile.deselect();
            }
        }
    }
}

const tile_mouseWheel_handler = function(pgui) {
    return (pointer, dx, dy, dz) => {
        const scale = pgui.state.scale;
        if (dy > 0 && scale > 0.5)
            pgui.setState('scale', scale - 0.1);
        else if (dy < 0 && scale < 1.5)
            pgui.setState('scale', scale + 0.1);
    }
}

const tile_onDragStart_handler = function(map, tile) {
    return () => {
        const geo = map.state.geo;
        map.state.container.setData("x_start", geo.x);
        map.state.container.setData("y_start", geo.y);
        console.log('Start => x: ' + geo.x + ' y: ' + geo.y);
    }

}

const tile_drag_handler = function(map) {
    return (pointer, dragX, dragY) => {
        console.log('Dragging => dx: ' + dragX + ' dy: ' + dragY);
        const container = map.state.container;
        let mapX = container.getData("x_start") + dragX;
        let mapY = container.getData("y_start") + dragY;
        console.log('Dragging => x: ' + mapX + ' y: ' + mapY);
        map.setState('geo', {
            x: mapX,
            y: mapY,
            z: 0
        })
    }
}