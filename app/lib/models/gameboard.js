const Phaser = require('phaser');
import Unit from './unit.js';
import PGUI from './gui/pgui.js';
import Tile from './gui/pgui/tile.js';
import {localData} from '../../localdata.js';

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
        const scenario = {
            columns: 26,
            rows: 12,
        }

        const alphabet = ['A','B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        for (let idx_columns = 0; idx_columns < scenario.columns; idx_columns++) {
            for (let idx_rows = 0; idx_rows < scenario.rows; idx_rows++) {
                let tile = new Tile(this, map);
                const alphabet_length = alphabet.length;
                const id_series = (idx_columns / alphabet_length);
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

                tile.setState(state);
                map.addChild(tile);
            }
        }
        map.draw();
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