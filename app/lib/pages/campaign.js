const m = require('mithril');
import Page from '../models/page.js'

export const page = new Page('/campaign');
page.setPage(function() {
    return m('div.mainMenu', [
        m('div.mainMenu_header', [
            m('div.mainMenu_header_icon', m('img', {src: 'lib/images/logo.svg', alt: "A plane flying upward that's being targeted."})),
            m('h1.mainMenu_header_label', 'Campaign Companion')
        ]),
        m('nav.mainMenu_nav', [
            m('div.mainMenu_nav_link',
                {onclick: function() { page.navigate('/warRoom') }}, 'Enter War Room >>'),
            m('div.mainMenu_nav_link',
                {onclick: function() { page.navigate('/main') }}, '<< Back')
        ]),
        m('div.campaignSelector',[
            m('div.campaignSelector_nav', [
                m('div.campaignSelector_nav_box'),
                m('div.campaignSelector_nav_box'),
                m('div.campaignSelector_nav_box'),
                m('div.campaignSelector_nav_box.--selected'),
                m('div.campaignSelector_nav_box'),
                m('div.campaignSelector_nav_box'),
                m('div.campaignSelector_nav_box'),
            ]),
            m('div.campaignSelector_details', [
                m('div.campaignSelector_details_name', 'Operation Overlord'),
                m('div.campaignSelector_details_bar'),
                m('div.campaignSelector_details_date', 'June 6th, 1944')
            ])
        ])
    ]);
});