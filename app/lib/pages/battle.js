const m = require('mithril');
import Page from '../classes/Page.js';
import {localData} from "../../localdata.js";

export const page = new Page('/battle');
page.setPage(function() {
    const selected_tile = localData.getValue('selected_tile');
    if (!selected_tile)
        return

    const factions = localData.getValue('factions');
    const defender_faction = factions[selected_tile.state.owner.name];
    const attacker_faction = (Object.keys(factions).indexOf(selected_tile.state.owner)) ? Object.values(factions)[1] : Object.values[0];

    return [
        m('h1', 'Number of Survivors'),
        m('div.results', [
            m('h2.results_header', attacker_faction.name),
            m('div.results_counters', [
                m('div.flex', [

                    Object.entries(selected_tile.state.units
                        .filter(unit => unit.faction.name === attacker_faction.name)
                        .reduce((acc, unit) => {
                            const key = unit.name;
                            if (!acc[key])
                                acc[key] = [];

                            // Add object to list for given key's value
                            acc[key].push(unit);
                            return acc;
                        }, {}))
                        .map(function([unit_type, units_array]) {
                            const health = units_array.reduce((p, v) => {console.log(v); return (p.health || 0) + v.health}, {});
                            return m('div.flex_item', [
                                m('div.unitCard', [
                                    m('div.unitCard_name', unit_type)
                                ]),
                                m('input', {type: 'number', min: 0, max: health, value: health})
                            ]);
                        })

                ])
            ])
        ]),
        m('div.results', [
            m('h2.results_header', defender_faction.name),
            m('div.results_counters', [
                m('div.flex', [

                    Object.entries(selected_tile.state.units
                        .filter(unit => unit.faction.name === defender_faction.name)
                        .reduce((acc, unit) => {
                            const key = unit.name;
                            if (!acc[key])
                                acc[key] = [];

                            // Add object to list for given key's value
                            acc[key].push(unit);
                            return acc;
                        }, {}))
                        .map(function([unit_type, units_array]) {
                            const health = units_array.reduce((p, v) => {console.log(v); return (p.health || 0) + v.health}, {});
                            return m('div.flex_item', [
                                m('div.unitCard', [
                                    m('div.unitCard_name', unit_type)
                                ]),
                                m('input', {type: 'number', min: 0, max: health, value: health})
                            ]);
                        })

                ])
            ])
        ]),
        m('button', {style: 'margin: 30px auto 0 auto;', onclick: function() {
            m.route.set('/warSim');
        }}, 'Submit Results')
    ]
});