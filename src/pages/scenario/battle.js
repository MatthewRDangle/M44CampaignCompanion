const m = require('mithril');

import Page from '../../classes/Page.js';
import BattleResultCalc from "../../components/scenario/BattleResultCalc.js";
import ScenarioDefinitionStore from "../../stores/ScenarioDefinition.store.js";


export const page = new Page('/session/battle?:tileId', (initialVnode) => {


    return {
        view: (vNode) => {
            const {attrs} = vNode;
            const {activeScenarioDefinition} = ScenarioDefinitionStore;

            const tileId = attrs.tileId;
            const [row, column] = tileId.split('-');
            const tile = activeScenarioDefinition.tiles[row][tileId];


            return [
                m('h1', 'Battle Results'),
                m(BattleResultCalc, {tile: tile})
            ]
        }
    }
});