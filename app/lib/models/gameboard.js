const Phaser = require('phaser');

export default class GameBoard {

    constructor(element, width, height) {
        if (!element)
            throw Error('GameBoard requires an element to mount to.');
        if (!isFinite(width) || !isFinite(height))
            throw Error('GameBoard requires a width an height to draw the tiles.');

        this.phaser_canvas = new Phaser.Game({
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
            this.phaser_canvas.scale.resize(window.innerWidth, window.innerHeight);
        });
    }
}

class Scene extends Phaser.Scene {
    constructor() {
        super('Scene');
    }

    create() {
        const map = new GUI(this);
        const scenario = {
            columns: 1,
            rows: 1,
        }

        const alphabet = ['A','B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        for (let idx_columns = 0; idx_columns < scenario.columns; idx_columns++) {
            for (let idx_rows = 1; idx_rows < scenario.rows; idx_rows++) {
                let tile = new Tile(Scene, map);
                const id_column = alphabet[idx_columns % alphabet.length];
                tile.id = id_column + '-' + idx_rows;
                map.addChild(tile);
            }
        }
    }
}