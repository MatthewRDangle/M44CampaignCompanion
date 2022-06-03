const m = require("mithril");
const classNames = require("classnames");
import UnitCard from './UnitCard.js';
import {activeScenario} from "../singletons/ActiveScenarioManager.js";
import Unit from "../classes/Unit.js";

const HexTile = (initialVnode) => {

    const handleOnClick = (tile) => {
        if (activeScenario.selectedUnit instanceof Unit)
            activeScenario.selectedUnit.moveTo(tile);
        else
            tile.select();
    }

    return {
        view: (vNode) => {
            const {attrs} = vNode;
            const hex = attrs.hex;
            const selectedUnit = activeScenario.selectedUnit;

            return (
                m('div.hexTile', {
                    style: {'background-color': `${hex.terrain?.color}`},
                    className: classNames(
                        {'hexTile-isSelected': hex.isSelected},
                        {'hexTile-eligibleMove': selectedUnit?.canMoveTo[hex.id] >= 0},
                        {'hexTile-contested': hex.isContested}
                    ),
                    onclick: (e) => {handleOnClick(hex)}
                }, m('div.hexTile_body', [
                    activeScenario.devMode || m('span', hex.id),
                    Object.keys(hex.units).map((faction_name) => {
                        return hex.units[faction_name].map((unit) => {
                            return m('div.hexTile_body_unit', m(UnitCard, {unit: unit}))
                        })
                    })
                ]))
            )
        }
    }
}

export default HexTile;