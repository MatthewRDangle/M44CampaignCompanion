import m from 'mithril';

import Divider from "../Divider.component.js";
import Button from "../Button.component.js";
import Input from "../input/DefaultInput.component.js";
import Tile from "../../models/scenario/Tile.model.js";


const BattleCalculatorForm = (initialVnode) => {

    const handleAttackingUnitHealthChange = (e, tile) => {
        tile.battle.changeAttackingUnitHealthTo(e.target.name, e.target.value)
    }

    const handleDefendingUnitHealthChange = (e, tile) => {
        tile.battle.changeDefendingUnitHealthTo(e.target.name, e.target.value)
    }

    const handlePostpone = (e) => {
        const onPostpone = initialVnode.attrs.onPostpone
        onPostpone && onPostpone(e)
    }

    const handleOnResolve = (e, tile) => {
        e.preventDefault();
        tile.battle.finalizeChanges();
        const resolved = tile.resolve()

        const onResolve = initialVnode.attrs.onResolve
        onResolve && onResolve(e, resolved)
    }


    return {
        view: (vNode) => {
            const {attrs} = vNode;
            const tile = attrs.tile || {};


            return ( !(tile instanceof Tile && tile.battle) ||
                m('form', [
                    m('div', {className: 'mb-8'}, [
                        m('h2', {className: 'text-2xl text-center mb-2rem'}, `${tile.battle.attackingFaction.name}`),
                        m(Divider, {className: 'block w-1/4 m-auto mb-3rem'}),
                        m('div', {className: 'flex justify-center py-4'},
                            tile.battle.attackingUnits ? Object.keys(tile.battle.attackingUnits).map(groupBy =>
                                m('div', {className: 'w-20 mx-4'},
                                    m(Input, {
                                        name: `${groupBy}`,
                                        type: 'number',
                                        step: 1,
                                        min: 0,
                                        defaultValue: tile.battle.attackingUnitsInitialHealth[groupBy],
                                        onchange: (e) => handleAttackingUnitHealthChange(e, tile)
                                    }, groupBy)
                                )
                            ) : 'No Units Available'
                        )
                    ]),
                    m('div', {className: 'mb-8'}, [
                        m('h2', {className: 'text-2xl text-center mb-2rem'}, `${tile.battle.defendingFaction.name}`),
                        m(Divider, {className: 'block w-1/4 m-auto mb-3rem'}),
                        m('div', {className: 'flex justify-center py-4'},
                            tile.battle.defendingUnits ? Object.keys(tile.battle.defendingUnits).map(groupBy =>
                                m('div', {className: 'w-20 mx-4'},
                                    m(Input, {
                                        name: `${groupBy}`,
                                        type: 'number',
                                        step: 1,
                                        min: 0,
                                        defaultValue: tile.battle.defendingUnitsInitialHealth[groupBy],
                                        onchange: (e) => handleDefendingUnitHealthChange(e, tile)
                                    }, groupBy)
                                )
                            ) : 'No Units Available'
                        )
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
                            onclick: (e) => handleOnResolve(e, tile)
                        }, 'Resolve')
                    )
                ])
            )
        }
    }
}

export default BattleCalculatorForm;