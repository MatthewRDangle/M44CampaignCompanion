const m = require('mithril');

import Page from '../../classes/Page.js';
import BattleResultCalc from "../../components/scenario/BattleResultCalc.js";
import scenarioStore from "../../stores/ScenarioStore.js";


export const page = new Page('/scenario/battle?:tileId', (initialVnode) => {


    return {
        view: (vNode) => {
            const {attrs} = vNode;
            const {activeScenario} = scenarioStore;

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