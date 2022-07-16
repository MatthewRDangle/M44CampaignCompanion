const m = require("mithril");

import Button from "../common/Button.js";
import Tile from "../../classes/Tile.js";


const BattleResultCalc = (initialVnode) => {

    const groupUnits = (units, owner) => {
        if (!units || !owner || !units[owner.name])
            return []

        const groupedUnits = Object.values(units[owner.name]).reduce((prev, unit) => {
            const key = unit.name;
            if (!prev[key])
                prev[key] = [];
            prev[key].push(unit);
            return prev;
        }, {});
        return Object.entries(groupedUnits);
    }

    const handleOnChange = (e) => {
        const {name, value, max} = e.currentTarget;
        const [factionName, unitName] = name.split('-');
        if (!results[factionName])
            results[factionName] = {};
        results[factionName][unitName] = max - value; // Casualties.
    }

    const handlePostpone = (e) => {
        m.route.set('/scenario')
    }

    const handleOnSubmit = (e, tile) => {
        e.preventDefault();
        Object.entries(results).forEach(([factionName, groupedCasualties]) => {
            const factionUnits = [...tile.units[factionName]];
            factionUnits.forEach((unit) => {
                const totalCasualties = groupedCasualties[unit.name];
                groupedCasualties[unit.name] = unit.reduceHealth(totalCasualties);
            });
        })

        if (tile.resolve())
            m.route.set('/scenario');
    }

    const results = {};


    return {
        view: (vNode) => {
            const {attrs} = vNode;
            const tile = attrs.tile || {};


            return ( !(tile instanceof Tile) ||
                m('form', {}, [
                    m('div.results', [
                        m('h2.results_header', `${tile.owner.name} (Defender)`),
                        m('div.results_counters', m('div.flex', groupUnits(tile.units, tile.owner).map(([groupKey, groupedUnits]) => {
                            const health = groupedUnits.reduce((prev, unit) => (prev += unit.health), 0);
                            return m('div.flex_item', [
                                m('label', groupKey),
                                m('input', {name: `${tile.owner.name}-${groupKey}`, type: 'number', step: 1, min: 0, max: health, defaultValue: health, onchange: handleOnChange})
                            ])})
                        ))
                    ]),
                    m('div.results', [
                        m('h2.results_header', `${tile.isContested.name} (Attacker)`),
                        m('div.results_counters', m('div.flex', groupUnits(tile.units, tile.isContested).map(([groupKey, groupedUnits]) => {
                            const health = groupedUnits.reduce((prev, unit) => (prev += unit.health), 0);
                            return m('div.flex_item', [
                                m('label', groupKey),
                                m('input', {name: `${tile.isContested.name}-${groupKey}`, type: 'number', step: 1, min: 0, max: health, defaultValue: health, onchange: handleOnChange})
                            ])})
                        ))
                    ]),
                    m(Button, {type: 'button', onclick: handlePostpone}, 'Postpone'),
                    m(Button, {type: 'button', onclick: (e) => handleOnSubmit(e, tile)}, 'Resolve')
                ])
            )
        }
    }
}

export default BattleResultCalc;