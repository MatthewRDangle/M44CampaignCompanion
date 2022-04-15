const m = require("mithril");
import Terrain from "../classes/Terrain.js";
import Button from "./Button.js";
import UnitCard from "./UnitCard.js";

const TileInfoHud = (initialVnode) => {

    const handleBattle = (tile) => {
        m.route.set('/battle/:tileId', {tileId: tile.id})
    }

    const handlePreview = (tile) => {
        m.route.set('/preview/:tileId', {tileId: tile.id})
    }

    const handleUnitSelect = (unit) => {
        unit.select();
    }

    return {
        view: (vNode) => {
            const {attrs} = vNode;
            const {currentTurn, tile} = attrs;

            return (
                m('div.tileInfoHud', [
                    m('div.tileInfoHud_header', [
                        m('div.tileInfoHud_header_unitCount', tile.calcTotalFactionHealth(currentTurn.name)),
                        m('div.tileInfoHud_header_description', (tile.terrain instanceof Terrain) ? tile.terrain.name : 'Unknown'),
                        m('div.tileInfoHud_header_actions', [
                            m('div.tileInfoHud_header_actions_button', m(Button, {onclick: () => {handleBattle(tile)}, disabled: !tile.isContested}, 'Battle')),
                            m('div.tileInfoHud_header_actions_button', m(Button, {onclick: () => {handlePreview(tile)}}, 'Preview'))
                        ])
                    ]),
                    m('div.tileInfoHud_body', [
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