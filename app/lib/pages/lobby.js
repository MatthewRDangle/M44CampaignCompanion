const m = require('mithril');
import Page from '../classes/Page.js'
import MainMenu from "../components/MainMenu.js"
import scenarioStore from "../stores/ScenarioStore.js";


export const page = new Page('/lobby', (initialVnode) => {
    const {loadAllScenarios} = scenarioStore;
    loadAllScenarios().then(() => m.redraw());

    return {
        view: (vNode) => {
            const {attrs} = vNode;
            const {scenarioList} = scenarioStore;

            return [
                m(MainMenu, {currentPage: this, title: 'Campaign Companion'}, [
                    m('div', {onclick: () => {m.route.set('/scenario?:key', {key: ''});}}, 'Enter War Room >>'),
                    m('div', {onclick: () => {m.route.set('/mainMenu')}}, '<< Back'),
                ]),
                m('div.campaignSelector',[
                    m('div.campaignSelector_nav', scenarioList.map(() =>
                        m('div.campaignSelector_nav_box')
                    ))
                    //     [
                    //     m('div.campaignSelector_nav_box'),
                    //     m('div.campaignSelector_nav_box'),
                    //     m('div.campaignSelector_nav_box'),
                    //     m('div.campaignSelector_nav_box.--selected'),
                    //     m('div.campaignSelector_nav_box'),
                    //     m('div.campaignSelector_nav_box'),
                    //     m('div.campaignSelector_nav_box'),
                    // ]),
                    // m('div.campaignSelector_details', [
                    //     m('div.campaignSelector_details_name', 'Operation Overlord'),
                    //     m('div.campaignSelector_details_bar'),
                    //     m('div.campaignSelector_details_date', 'June 6th, 1944')
                    // ])
                ])
            ]
        }
    }
});