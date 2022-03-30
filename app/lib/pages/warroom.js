const m = require('mithril');
import Page from '../models/page.js'
import MainMenu from "../components/MainMenu.js";
import {scenario} from "../../scenario_temp.js";
import {Scenario} from "../models/scenario.js";
import ScenarioConfig from "../models/ScenarioConfig.js";
import {global} from '../../global.js';

export const page = new Page('/warRoom');
page.setPage(function() {
    return [
        m(MainMenu, {currentPage: this, title: 'Campaign Companion'}, [
            m('div', {onclick: () => {
                global.navigate('activeScenario').setValue(
                    new Scenario(new ScenarioConfig(scenario))
                );
                page.navigate('/warSim');
            }}, 'Declare War'),
            m('div', {onclick: () => {page.navigate('/campaign')}}, '<< Back'),
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
});