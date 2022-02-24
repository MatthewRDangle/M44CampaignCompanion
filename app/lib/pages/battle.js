const m = require('mithril');
import Page from '../models/page.js';
import GameBoard from "../models/gameboard.js";
import {localData} from "../../localdata.js";

export const page = new Page('/battle');
page.setPage(function() {
    return [
        m('h1', 'Number of Survivors'),
        m('div.results', [
            m('h2.results_header', 'Attacker'),
            m('div.results_counters', [
                m('div.flex', [
                    m('div.flex_item', [
                        m('div.unitCard', [
                            m('div.unitCard_name', 'Infantry')
                        ]),
                        m('input', {type: 'number', min: 0, max: 100, value: 0})
                    ]),
                    m('div.flex_item', [
                        m('div.unitCard', [
                            m('div.unitCard_name', 'Tanks')
                        ]),
                        m('input', {type: 'number', min: 0, max: 100, value: 0})
                    ])
                ])
            ])
        ]),
        m('div.results', [
            m('h2.results_header', 'Defender'),
            m('div.results_counters', [
                m('div.flex', [
                    m('div.flex_item', [
                        m('div.unitCard', [
                            m('div.unitCard_name', 'Infantry')
                        ]),
                        m('input', {type: 'number', min: 0, max: 100, value: 0})
                    ]),
                    m('div.flex_item', [
                        m('div.unitCard', [
                            m('div.unitCard_name', 'Tanks')
                        ]),
                        m('input', {type: 'number', min: 0, max: 100, value: 0})
                    ])
                ])
            ])
        ])
    ]
});