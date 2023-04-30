const m = require("mithril");

import Divider from "./templates/Divider.js";
import Button from "./templates/Button.js";
import Input from "./templates/Input.js";
import Tile from "../models/Tile.js";


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

    const handleOnChange = (e, factionName, unitName) => {
        const {value, max} = e.currentTarget;
        if (!results[factionName])
            results[factionName] = {};
        results[factionName][unitName] = max - value; // Casualties.
    }

    const handlePostpone = (e) => {
        m.route.set('/session')
    }

    const handleOnSubmit = (e, tile) => {
        e.preventDefault();
        Object.entries(results).forEach(([factionName, groupedCasualties]) => {
            const factionUnits = [...tile.units[factionName]];
            factionUnits.forEach((unit) => {
                const totalCasualties = groupedCasualties[unit.name];
                if (totalCasualties !== undefined)
                    groupedCasualties[unit.name] = unit.reduceHealth(totalCasualties);
            });
        })

        if (tile.resolve())
            m.route.set('/session');
    }

    const results = {};


    return {
        view: (vNode) => {
            const {attrs} = vNode;
            const tile = attrs.tile || {};


            return ( !(tile instanceof Tile) ||
                m('form', [
                    m('div', {className: 'mb-8'}, [
                        m('h2', {className: 'text-2xl text-center mb-2rem'}, `${tile.owner.name}`),
                        m(Divider, {className: 'block w-1/4 m-auto mb-3rem'}),
                        m('div', {className: 'flex justify-center py-4'},
                            groupUnits(tile.units, tile.owner).map(([groupKey, groupedUnits]) => {
                                const health = groupedUnits.reduce((prev, unit) => (prev += unit.health), 0);
                                return m('div', {className: 'w-20 mx-4'},
                                    m(Input, {
                                        name: `${tile.owner.name}-${groupKey}`,
                                        type: 'number',
                                        step: 1,
                                        min: 0,
                                        max: health,
                                        defaultValue: health,
                                        onchange: (e) => {handleOnChange(e, tile.owner.name, groupKey)}
                                    }, groupKey)
                                )
                            }
                        ))
                    ]),
                    m('div', {className: 'mb-8'}, [
                        m('h2', {className: 'text-2xl text-center mb-2rem'}, `${tile.isContested.name}`),
                        m(Divider, {className: 'block w-1/4 m-auto mb-3rem'}),
                        m('div', {className: 'flex justify-center py-4'},
                            groupUnits(tile.units, tile.isContested).map(([groupKey, groupedUnits]) => {
                                    const health = groupedUnits.reduce((prev, unit) => (prev += unit.health), 0);
                                    return m('div', {className: 'w-20 mx-4'},
                                        m(Input, {
                                            name: `${tile.isContested.name}-${groupKey}`,
                                            type: 'number',
                                            step: 1,
                                            min: 0,
                                            max: health,
                                            defaultValue: health,
                                            onchange: (e) => {handleOnChange(e, tile.isContested.name, groupKey)}
                                        }, groupKey)
                                    )
                                }
                            ))
                    ]),
                    m('div', {className: 'absolute left-[5%] bottom-[5%]'},
                        m(Button, {
                            type: 'button',
                            onclick: handlePostpone
                        }, 'Postpone'),
                    ),
                    m('div', {className: 'absolute right-[5%] bottom-[5%]'},
                        m(Button, {
                            type: 'button',
                            onclick: (e) => handleOnSubmit(e, tile)
                        }, 'Resolve')
                    )
                ])
            )
        }
    }
}

export default BattleResultCalc;