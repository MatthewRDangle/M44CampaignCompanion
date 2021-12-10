const m = require('mithril');
import Page from '../js/page.js'

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
                {onclick: function() { page.navigate('/main') }}, '<< Back')
        ])
    ]);
});