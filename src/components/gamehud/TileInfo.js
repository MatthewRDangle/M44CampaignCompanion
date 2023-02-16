const m = require("mithril");

import Terrain from "../../classes/Terrain.js";
import Button from "../templates/Button.js";
import UnitCard from "../scenario/UnitFlag.js";


const TileInfo = (initialVnode) => {

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
                m('div', {className: 'absolute left-8 bottom-12 z-1'}, [
                    m('div', {className: 'relative -left-2 flex mb-4'}, [
                        (tile.units[currentTurn.name]) ? tile.units[currentTurn.name].map((unit) => (
                            m('div', {className: 'scale-75'}, m(UnitCard, {unit: unit, onclick: () => {handleUnitSelect(unit)}}))
                        )) : ''
                    ]),
                    m('div', {className: 'flex flex-row flex-wrap align-center'}, [
                        m('div', {className: 'inline-block px-4 py-1 bg-background rounded'}, (tile.terrain instanceof Terrain) ? tile.terrain.name : 'Unknown'),
                        m('div', {className: 'flex flex-row flex-full'}, [
                            m('div', {className: 'inline-block ml-2'}, m(Button, {onclick: () => {handlePreview(tile)}}, 'Preview')),
                            m('div', {className: 'inline-block ml-2'}, m(Button, {onclick: () => {handleBattle(tile)}, disabled: !tile.isContested}, 'Battle'))
                        ])
                    ]),
                ])
            )
        }
    }
}

export default TileInfo;