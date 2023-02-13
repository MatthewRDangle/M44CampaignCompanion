const m = require("mithril");

import Terrain from "../../../classes/Terrain.js";
import Button from "../../templates/Button.js";
import UnitCard from "../UnitCard.js";


const TileInfoHud = (initialVnode) => {

    const handleBattle = (tile) => {
        m.route.set('/session/battle?:tileId', {tileId: tile.id})
    }

    const handlePreview = (tile) => {
        m.route.set('/session/preview?:tileId', {tileId: tile.id})
    }

    const handleUnitSelect = (unit) => {
        unit.select();
    }


    return {
        view: (vNode) => {
            const {attrs} = vNode;
            const {currentTurn, tile} = attrs;


            return (
                m('div', {className: 'absolute left-4 bottom-4 w-600px z-1'}, [
                    m('div', {className: 'flex flex-row flex-wrap align-center p-4 bg-background'}, [
                        m('div', {className: 'inline-block mr-3'}, tile.calcTotalFactionHealth(currentTurn.name)),
                        m('div', {className: 'inline-block mr-3'}, (tile.terrain instanceof Terrain) ? tile.terrain.name : 'Unknown'),
                        m('div', {className: 'flex flex-row flex-full'}, [
                            m('div', {className: 'inline-block ml-2'}, m(Button, {onclick: () => {handleBattle(tile)}, disabled: !tile.isContested}, 'Battle')),
                            m('div', {className: 'inline-block ml-2'}, m(Button, {onclick: () => {handlePreview(tile)}}, 'Preview'))
                        ])
                    ]),
                    m('div', {className: 'flex p-3 gap-3 bg-background'}, [
                        (tile.units[currentTurn.name]) ? tile.units[currentTurn.name].map((unit) => (
                            m(UnitCard, {unit: unit, onclick: () => {handleUnitSelect(unit)}})
                        )) : ''
                    ])
                ])
            )
        }
    }
}

export default TileInfoHud;