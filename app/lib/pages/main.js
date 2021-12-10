const m = require('mithril');
import Page from '../js/page.js'

export const page = new Page('/main');
page.setPage(function() {
    return m('div', [
        m('h1', 'Main Menu'),
        m('div', [
            m('div', {onclick: function() { page.navigate('/campaign') }}, 'Open Campaign Selector')
        ])
    ]);
});