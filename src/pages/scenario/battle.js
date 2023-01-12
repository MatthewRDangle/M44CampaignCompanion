const m = require('mithril');

import Page from '../../classes/Page.js';
import BattleResultCalc from "../../components/scenario/BattleResultCalc.js";
import scenarioManifestStore from "../../stores/ScenarioManifest.store.js";


export const page = new Page('/scenario/battle?:tileId', (initialVnode) => {


    return {
        view: (vNode) => {
            const {attrs} = vNode;
            const {activeScenario} = scenarioManifestStore;

            const tileId = attrs.tileId;
            const [row, column] = tileId.split('-');
            const tile = activeScenario.tiles[row][tileId];


            return [
                m('h1', 'Battle Results'),
                m(BattleResultCalc, {tile: tile})
            ]
        }
    }
});