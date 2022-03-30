const m = require('mithril');
const Phaser = require('phaser');
const Data = require("../api/data");
import Terrain from "./Terrain.js";
import Unit from './Unit.js';
import PGUI from './gui/pgui.js';
import Tile from './gui/pgui/tile.js';
import Faction from "./Faction.js";
import {localData} from '../../localdata.js';
import {scenario} from '../../scenario_temp.js';
import {Scenario} from "./Scenario.js";
import {global} from '../../global.js';

export default class GameBoard {

    constructor(element, width, height) {

        if (!element)
            throw Error('GameBoard requires an element to mount to.');
        if (!isFinite(width) || !isFinite(height))
            throw Error('GameBoard requires a width an height to draw the tiles.');

        this.onTileSelect = undefined;

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
        localData.navigate('scene').setValue(map);

        const activeScenario = global.getValue('activeScenario');
        // const scenario_data = new Data(activeScenario);
        this.input.dragDistanceThreshold = 16;

        activeScenario.generate(this, map);
        map.draw();
    }
}