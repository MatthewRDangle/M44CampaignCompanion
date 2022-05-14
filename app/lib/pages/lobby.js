const m = require('mithril');
import Page from '../classes/Page.js'
import MainMenu from "../components/MainMenu.js"
import scenarioStore from "../stores/ScenarioStore.js";
import {scenarioDefinition} from "../../../test/scenario_definition.js";
import {activeScenarioManager} from "../singletons/ActiveScenarioManager.js";
import Scenario from "../classes/Scenario.js";


export const page = new Page('/lobby', (initialVnode) => {
    const {loadAllScenarios} = scenarioStore;
    loadAllScenarios().then(() => m.redraw());

    return {
        view: (vNode) => {
            const {attrs} = vNode;
            const {scenarioList} = scenarioStore;

            return [
                m(MainMenu, {currentPage: this, title: 'Campaign Companion'}, [
                    m('div', {onclick: () => {
                        debugger;
                        activeScenarioManager.set(new Scenario(scenarioDefinition));
                        m.route.set('/scenario?:key', {key: ''});
                    }}, 'Enter War Room >>'),
                    m('div', {onclick: () => {m.route.set('/mainMenu')}}, '<< Back'),
                ]),
                m('div.campaignSelector',[
                    m('div.campaignSelector_nav', scenarioList.map(() =>
                        m('div.campaignSelector_nav_box')
                    ))
                ])
            ]
        }
    }
});