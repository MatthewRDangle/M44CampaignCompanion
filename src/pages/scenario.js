const m = require('mithril');

import Page from '../classes/Page.js';
import GameBoard from "../components/scenario/GameBoard.js"
import scenarioManifestStore from "../stores/ScenarioManifest.store.js";


export const page = new Page('/scenario', (initialVnode) => {


    return {
        view: (vNode) => {
            const {activeScenario} = scenarioManifestStore;

            return m('div', {className: 'w-screen h-screen'}, m(GameBoard, {scenario: activeScenario}))
        }
    }
});
