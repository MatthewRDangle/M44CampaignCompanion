const m = require("mithril");

import modeStore from "../../stores/mode.store.js";
import Terrain from "../../models/scenario/Terrain.js";
import Unit from "../../models/scenario/Unit.js";
import Button from "../Button.js";
import UnitCard from "../token/FactionToken.js";


const TileInfoHud = (initialVnode) => {

    const handleMoveMode = () => {
        modeStore.disableIndirectFireMode()
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

    const handleUnitSelect = (unit) => {
        unit.select();
    }


    return {
        view: (vNode) => {
            const {attrs} = vNode;
            const {currentTurn, tile} = attrs;
            const {isMoveUnitMode, isIndirectFireMode, selectedUnit} = modeStore;
            const unitExists = !!selectedUnit
            const canIndirectFire = !!unitExists && !isIndirectFireMode ? selectedUnit.canAttackIndirectly : false
            const indirectAttackAccuracyModifier = tile.indirectAttackAccuracyModifier ? -tile.indirectAttackAccuracyModifier + '%' : '0%'
            const indirectAttackDamageModifier = tile.indirectAttackDamageModifier ? -tile.indirectAttackDamageModifier + 'dmg' : '0 dmg'
            const selectedUnitHasIndirectAttack = !!selectedUnit?.attack.indirect
            const selectedUnitIndirectAttackRange = selectedUnit?.attack.indirect?.range ?? 0
            const selectedUnitIndirectAttackIsOperational = selectedUnit?.attack.indirect?.operational

            return (
                m('div', {className: 'absolute left-8 bottom-12 z-1'}, [
                    m('div', {className: 'relative -left-2 flex mb-4'}, [
                        (tile.units[currentTurn.name]) ? tile.units[currentTurn.name].map((unit) => (
                            m('div', {className: 'scale-75'}, m(UnitCard, {unit: unit, onclick: () => {handleUnitSelect(unit)}}))
                        )) : ''
                    ]),
                    m('div', {className: 'flex flex-row flex-wrap align-center mb-1'}, [
                        m('div', {className: 'flex flex-row flex-full'}, [
                            m('div', {className: 'inline-block'}, m(Button, {onclick: () => {handlePreview(tile)}}, 'Preview')),
                            m('div', {className: 'inline-block ml-2'}, m(Button, {onclick: () => {handleBattle(tile)}, disabled: !tile.isContested}, 'Battle')),
                            unitExists && !isMoveUnitMode && !selectedUnit.isExhausted && m('div', {className: 'inline-block ml-2'}, m(Button, {onclick: () => {handleMoveMode()}}, 'Move')),
                            unitExists && canIndirectFire && m('div', {className: 'inline-block ml-2'}, m(Button, {onclick: () => {handleIndirectFireMode()}}, 'Indirect'))
                        ])
                    ]),
                    m('div', {className: 'flex flex-row flex-wrap'}, [
                        tile.terrain instanceof Terrain && m('div', {className: 'flex flex-col p-3 mr-1 bg-background rounded'}, [
                            m('span', `Terrain: ${tile.terrain?.name}`),
                            m('span', `Movement Cost: ${tile.movementCost}`),
                            m('span',  `Indirect Defense: ${indirectAttackAccuracyModifier} / ${indirectAttackDamageModifier}`)
                        ]),
                        selectedUnit instanceof Unit && m('div', {className: 'flex flex-col p-3 mr-1 bg-background rounded'}, [
                            m('span', `Name: ${selectedUnit.name}`),
                            m('span', `Health: ${selectedUnit.health}`),
                            m('span', `Movement: ${selectedUnit.available_movement} of ${selectedUnit.movement_cap}`),
                        ]),
                        selectedUnit instanceof Unit && m('div', {className: 'flex flex-col p-3 bg-background rounded'}, [
                            m('span', `Direct Attack: 
                                ${selectedUnit.attack.direct ? 'Operable' : 'Inoperable'}
                            `),
                            selectedUnitHasIndirectAttack && m('span', `Indirect Attack: 
                                ${selectedUnitIndirectAttackIsOperational ? indirectAttackAccuracyModifier + ' / ' + indirectAttackDamageModifier : 'Inoperable'},
                            `),
                            selectedUnitHasIndirectAttack && m('span', `Indirect Range: ${selectedUnitIndirectAttackRange}`),
                        ]),
                    ]),
                ])
            )
        }
    }
}

export default TileInfoHud;