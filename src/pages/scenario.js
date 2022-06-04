const m = require('mithril');

import Page from '../classes/Page.js';
import GameBoard from "../components/scenario/GameBoard.js"
import scenarioStore from "../stores/ScenarioStore.js";


export const page = new Page('/scenario', (initialVnode) => {


    return {
        view: (vNode) => {
            const {activeScenario} = scenarioStore;

            return m(GameBoard, {scenario: activeScenario})
        }
    }
});
