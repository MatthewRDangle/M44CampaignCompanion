import Terrain from "../../../models/scenario/Terrain.model.js";
import m from 'mithril';
import Button from "../../Button.view.js";
import UnitToken from "../token/UnitToken.view.js";
import modeStore from "../../../stores/Mode.store.js";


const TileInfoHud = (initialVnode) => {

    const handleMoveMode = () => {
        modeStore.enableMovementMode()
    }

    const handleDirectFireMode = () => {
        modeStore.enableDirectAttackMode()
    }

    const handleIndirectFireMode = () => {
        modeStore.enableIndirectFireMode()
    }

    const handleBattle = (tile) => {
        m.route.set('/scenario/tile/:tileId/setup', {tileId: tile.id})
    }

    const handlePreview = (tile) => {
        m.route.set('/scenario/tile/:tileId/map', {tileId: tile.id})
    }

    const handleUnitSelect = (e, unit) => {
        if (e.shiftKey) {
            if (modeStore.hasSelectedUnit(unit))
                unit.deselect()
            else
                unit.select();
        } else {
            modeStore.deselectAllUnits()
            unit.select();
        }
    }


    return {
        view: (vNode) => {
            const {attrs} = vNode;
            const {currentTurn, tile} = attrs;
            const {isMovementMode, isDirectAttackMode, isIndirectFireMode, selectedUnits} = modeStore;
            const indirectAttackAccuracyModifier = tile.indirectAttackAccuracyModifier ? -tile.indirectAttackAccuracyModifier + '%' : '0%'
            const indirectAttackDamageModifier = tile.indirectAttackDamageModifier ? -tile.indirectAttackDamageModifier + 'dmg' : '0 dmg'
            // const selectedUnitHasIndirectAttack = !!selectedUnit?.attack.indirect
            // const selectedUnitIndirectAttackRange = selectedUnit?.attack.indirect?.range ?? 0
            // const selectedUnitIndirectAttackIsOperational = selectedUnit?.attack.indirect?.operational

            return (
                m('div', {className: 'absolute left-8 bottom-12 z-1'}, [
                    m('div', {className: 'relative -left-2 flex mb-4'}, [
                        (tile.units[currentTurn.name]) ? tile.units[currentTurn.name].map((unit) => (
                            m('div', {className: 'scale-75'}, m(UnitToken, {unit: unit, onclick: (e) => {handleUnitSelect(e, unit)}}))
                        )) : ''
                    ]),
                    m('div', {className: 'flex flex-row flex-wrap align-center mb-1'}, [
                        m('div', {className: 'flex flex-row flex-full'}, [
                            m('div', {className: 'inline-block'},
                                m(Button, {
                                    onclick: () => {handlePreview(tile)}
                                }, 'Preview')
                            ),
                            m('div', {className: 'inline-block ml-2'},
                                m(Button, {
                                    onclick: () => {handleBattle(tile)},
                                    disabled: !tile.isContested
                                }, 'Battle')
                            ),
                            m('div', {className: 'inline-block ml-2'},
                                m(Button, {
                                    onclick: () => {handleMoveMode()},
                                    disabled: !selectedUnits.length || isMovementMode
                                }, 'Move')),
                            m('div', {className: 'inline-block ml-2'},
                                m(Button, {
                                    onclick: () => {handleDirectFireMode()},
                                    disabled: !selectedUnits.length || isDirectAttackMode
                                }, 'Direct')
                            ),
                            m('div', {className: 'inline-block ml-2'},
                                m(Button, {
                                    onclick: () => {handleIndirectFireMode()},
                                    disabled: !selectedUnits.length || isIndirectFireMode
                                }, 'Indirect')
                            )
                        ])
                    ]),
                    m('div', {className: 'flex flex-row flex-wrap'}, [
                        tile.terrain instanceof Terrain && m('div', {className: 'flex flex-col p-3 mr-1 bg-background rounded'}, [
                            m('span', `Terrain: ${tile.terrain?.name}`),
                            m('span', `Movement Cost: ${tile.movementCost}`),
                            m('span',  `Indirect Defense: ${indirectAttackAccuracyModifier} / ${indirectAttackDamageModifier}`)
                        ]),
                        // selectedUnit instanceof Unit && m('div', {className: 'flex flex-col p-3 mr-1 bg-background rounded'}, [
                        //     m('span', `Name: ${selectedUnit.name}`),
                        //     m('span', `Health: ${selectedUnit.health}`),
                        //     m('span', `Movement: ${selectedUnit.available_movement} of ${selectedUnit.movement_cap}`),
                        // ]),
                        // selectedUnit instanceof Unit && m('div', {className: 'flex flex-col p-3 bg-background rounded'}, [
                        //     m('span', `Direct Attack:
                        //         ${selectedUnit.attack.direct ? 'Operable' : 'Inoperable'}
                        //     `),
                        //     selectedUnitHasIndirectAttack && m('span', `Indirect Attack:
                        //         ${selectedUnitIndirectAttackIsOperational ? indirectAttackAccuracyModifier + ' / ' + indirectAttackDamageModifier : 'Inoperable'},
                        //     `),
                        //     selectedUnitHasIndirectAttack && m('span', `Indirect Range: ${selectedUnitIndirectAttackRange}`),
                        // ]),
                    ]),
                ])
            )
        }
    }
}

export default TileInfoHud;