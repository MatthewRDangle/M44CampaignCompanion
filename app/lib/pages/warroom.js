const m = require('mithril');
import Page from '../models/page.js'

export const page = new Page('/warRoom');
page.setPage(function() {
    return m('div.mainMenu', [
        m('div.mainMenu_header', [
            m('div.mainMenu_header_icon', m('img', {src: 'lib/images/logo.svg', alt: "A plane flying upward that's being targeted."})),
            m('h1.mainMenu_header_label', 'Campaign Companion')
        ]),
        m('nav.mainMenu_nav', [
            m('div.mainMenu_nav_link',
                {onclick: function() { page.navigate('/warSim') }}, 'Declare War'),
            m('div.mainMenu_nav_link',
                {onclick: function() { page.navigate('/campaign') }}, '<< Back')
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
    ]);
});