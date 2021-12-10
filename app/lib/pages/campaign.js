const m = require('mithril');
import Page from '../js/page.js'

export const page = new Page('/campaign');
page.setPage(function() {
    return m('div', [
        m('h1', 'Campaign'),
        m('div', [
            m('div', {onclick: function() { page.navigate('/main') }}, 'Open Main Menu')
        ])
    ]);
});