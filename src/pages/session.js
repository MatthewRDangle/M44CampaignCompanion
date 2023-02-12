const m = require('mithril');

import Page from '../classes/Page.js';
import GameBoard from "../components/scenario/GameBoard.js"
import scenarioDefinitionStore from "../stores/ScenarioDefinition.store.js";


export const page = new Page('/session', (initialVnode) => {


    return {
        view: (vNode) => {
            const {activeScenarioDefinition} = scenarioDefinitionStore;

            return m('div', {className: 'w-screen h-screen'}, m(GameBoard, {scenario: activeScenarioDefinition}))
        }
    }
});
