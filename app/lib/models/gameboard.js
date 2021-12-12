const Phaser = require('phaser');
import PGUI from './gui/pgui.js';
import Tile from './gui/pgui/tile.js';

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
            columns: 1,
            rows: 1,
        }

        const alphabet = ['A','B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        for (let idx_columns = 0; idx_columns < scenario.columns; idx_columns++) {
            for (let idx_rows = 0; idx_rows < scenario.rows; idx_rows++) {
                let tile = new Tile(this, map);
                const alphabet_length = alphabet.length;
                const id_series = (idx_columns / alphabet_length);
                const id_column =  alphabet[idx_columns % alphabet_length];
                tile.setID(id_series + '-' + id_column + '-' + (idx_rows + 1));
                tile.setState('geo', {
                    x: 0,
                    y: 0,
                    z: 0
                });
                map.addChild(tile);
            }
        }
        map.draw();
    }
}