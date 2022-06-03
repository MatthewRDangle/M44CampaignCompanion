const m = require('mithril');

import Page from '../classes/Page.js'
import MainMenu from "../components/MainMenu.js"
import scenarioStore from "../stores/ScenarioStore.js";


export const page = new Page('/lobby', (initialVnode) => {
    const {loadScenarioFileRegistry, setActiveScenario} = scenarioStore;
    loadScenarioFileRegistry().then(() => m.redraw());

    const handleOnClick = (registryItem) => {
        setActiveScenario(registryItem.id)
        m.route.set('/scenario?:id', {id: registryItem.id});
    }

    return {
        view: (vNode) => {
            const {attrs} = vNode;
            const {fileRegistryList} = scenarioStore;

            return [
                m(MainMenu, {currentPage: this, title: 'Campaign Companion'}, fileRegistryList.map(registryItem =>
                    m('div', {onclick: () => {handleOnClick(registryItem)}}, registryItem.displayName)
                ))
            ]
        }
    }
});