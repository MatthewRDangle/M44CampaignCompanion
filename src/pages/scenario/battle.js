const m = require('mithril');

import Page from '../../classes/Page.js';
import BattleResultCalc from "../../components/BattleResultCalc.js";
import TitleBar from "../../components/templates/TitleBar.js";
import Body from "../../components/Body.js";
import Background from "../../components/Background.js";
import ScenarioDefinitionStore from "../../stores/ScenarioDefinition.store.js";


export const page = new Page('/session/battle?:tileId', (initialVnode) => {


    return {
        view: (vNode) => {
            const {attrs} = vNode;
            const {activeScenarioDefinition} = ScenarioDefinitionStore;

            const tileId = attrs.tileId;
            const [row, column] = tileId.split('-');
            const tile = activeScenarioDefinition.tiles[row][tileId];


            return m(Body, [
                m(Background),
                m(TitleBar, 'Battle Results'),
                m(BattleResultCalc, {tile: tile})
            ])
        }
    }
});