const m = require('mithril');
import Page from '../classes/page.js'
import MainMenu from "../components/MainMenu.js"

export const page = new Page('/campaign');
page.setPage(function() {
    return [
        m(MainMenu, {currentPage: this, title: 'Campaign Companion'}, [
            m('div', {onclick: () => {page.navigate('/warRoom')}}, 'Enter War Room >>'),
            m('div', {onclick: () => {page.navigate('/main')}}, '<< Back'),
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
    ]
});