const m = require('mithril');

import Page from '../classes/Page.js';
import Body from "../components/Body.js";
import scenarioStore from "../stores/ScenarioStore.js";


export const page = new Page('/mainMenu', (initialVnode) => {


    return {
        oninit: async () => {
            const {setTestData} = scenarioStore;
            await setTestData();
        },
        view: (vNode) => {
            const {attrs} = vNode;


            return m(Body)
        }
    }
});