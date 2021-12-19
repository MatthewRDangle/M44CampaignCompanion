const Phaser = require('phaser');
const Data = require("../api/data");
import Unit from './unit.js';
import PGUI from './gui/pgui.js';
import Tile from './gui/pgui/tile.js';
import Faction from "./faction.js";
import {localData} from '../../localdata.js';
import {scenario} from '../../scenario_temp.js';

export default class GameBoard {

    constructor(element, width, height) {

        if (!element)
            throw Error('GameBoard requires an element to mount to.');
        if (!isFinite(width) || !isFinite(height))
            throw Error('GameBoard requires a width an height to draw the tiles.');

        let phaser_canvas = new Phaser.Game({
            dom: { parent: element.id },
            title: 'WWII Campaign Companion',
            version: 'beta',
            width: window.innerWidth,
            height: window.innerHeight,
            parent: element,
            url: window.location.href,
            scale: {
                autoCenter: Phaser.Scale.CENTER_BOTH
            },
            type: Phaser.AUTO,
            disableContextMenu: true,
            scene: [Scene]
        });
        window.addEventListener('resize', function resize() {
            phaser_canvas.scale.resize(window.innerWidth, window.innerHeight);
        });
    }
}

class Scene extends Phaser.Scene {
    constructor() {
        super('Scene');
    }

    create() {
        const map = new PGUI(this);
        const scenario_data = new Data(scenario);

        const alphabet = ['A','B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        for (let idx_columns = 0; idx_columns < scenario_data.getValue('columns'); idx_columns++) {
            for (let idx_rows = 0; idx_rows < scenario_data.getValue('rows'); idx_rows++) {
                let tile = new Tile(this, map);
                const alphabet_length = alphabet.length;
                const id_series = (idx_columns % alphabet_length);
                const id_column =  alphabet[idx_columns % alphabet_length];
                tile.setID(id_series + '-' + id_column + '-' + (idx_rows + 1));

                let state = {};
                state.geo = {
                    x: (idx_columns > 0) ? idx_columns * (2/3 * tile.state.width) : idx_columns * tile.state.width,
                    y: (idx_columns % 2 * (tile.state.height / 2)) + (idx_rows * tile.state.height),
                    z: 0
                };
                state.event = {
                    onclick: tile_onclick_handler(tile)
                }

                if (scenario_data.getValue('devMode')) {
                    state.textString = tile.id;
                    state.textHAlign = 'center';
                    state.textVAlign = 'middle';
                }

                const scenario_tiles = scenario_data.getValue('tiles');
                if (scenario_tiles && scenario_tiles.hasOwnProperty(tile.id)) {
                    const instructions_data = scenario_data.navigate('tiles/' + tile.id);
                    tile_scenario_api(tile, instructions_data);
                }

                tile.setState(state);
                map.addChild(tile);
            }
        }
        map.draw();
    }
}

const tile_scenario_api = function(tile, instructions_data) {
    const instructions = instructions_data.getValue();
    const factions_list = instructions_data.root.factions;
    factions_list.forEach(function(name) {
        localData.navigate('factions').addChild(name, new Faction(name));
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
        let mouse_event = pointer.event;
        let mouse_button = mouse_event.button;

        // Left Click.
        if (mouse_button === 0) {
            const viewMode = localData.getValue('viewMode');
            if (viewMode === 'view') {
                tile.select();
            }
            else if (viewMode === 'move') {
                const selected_unit = localData.getValue('selected_unit');
                selected_unit.moveTo(tile);
            }
        }

        // Right Click.
        else if (mouse_button === 3) {
            const selected_tile = localData.getValue('selected_tile');
            if (selected_tile instanceof Tile)
                selected_tile.deselect();
        }
    }
}