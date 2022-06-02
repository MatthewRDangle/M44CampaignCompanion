const m = require('mithril');

import Page from '../classes/Page.js'
import MainMenu from "../components/MainMenu.js"
import scenarioStore from "../stores/ScenarioStore.js";


export const page = new Page('/lobby', (initialVnode) => {
    const {loadScenarioFileRegistry, setActiveScenario} = scenarioStore;
    loadScenarioFileRegistry().then(() => m.redraw());

    return {
        view: (vNode) => {
            const {attrs} = vNode;
            const {fileRegistryList} = scenarioStore;

            return [
                m(MainMenu, {currentPage: this, title: 'Campaign Companion'}, [
                    m('div', {onclick: () => {
                        setActiveScenario(fileRegistryList[0].id)
                        m.route.set('/scenario?:id', {id: fileRegistryList[0].id});
                    }}, 'Enter War Room >>'),
                    m('div', {onclick: () => {m.route.set('/mainMenu')}}, '<< Back'),
                ]),
                m('div.campaignSelector',[
                    m('div.campaignSelector_nav', fileRegistryList.map(() =>
                        m('div.campaignSelector_nav_box')
                    ))
                ])
            ]
        }
    }
});