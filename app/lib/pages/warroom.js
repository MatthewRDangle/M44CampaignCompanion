const m = require('mithril');
import Page from '../classes/Page.js'
import MainMenu from "../components/MainMenu.js";
import {scenario} from "../../../scenarios/scenario_temp.js";
import Scenario from "../classes/Scenario.js";
import {activeScenarioManager} from '../singletons/ActiveScenarioManager.js';

export const page = new Page('/warRoom', (initialVnode) => {

    return {
        view: (vNode) => {
            const {attrs} = vNode;

            return [
                m(MainMenu, {currentPage: this, title: 'Campaign Companion'}, [
                    m('div', {onclick: () => {
                            activeScenarioManager.set( new Scenario(scenario) );
                            m.route.set('/warSim');
                        }}, 'Declare War'),
                    m('div', {onclick: () => {m.route.set('/campaign')}}, '<< Back'),
                ]),
                m('div.scenarioDetails', [
                    m('div.scenarioDetails_text', [
                        m('h2', 'Operation Overlord'),
                        m('span', 'June 6th, 1944'),
                        m('h3', 'Briefing'),
                        m('p', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.'),
                        m('h3', 'Victory Conditions'),
                        m('p', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.')
                    ])
                ])
            ]
        }
    }
});