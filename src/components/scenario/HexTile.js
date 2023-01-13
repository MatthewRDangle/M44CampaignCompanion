const m = require("mithril");
const classNames = require("classnames");

import UnitCard from './UnitCard.js';
import Unit from "../../classes/Unit.js";
import scenarioDefinitionStore from "../../stores/ScenarioDefinition.store.js";


const HexTile = (initialVnode) => {

    const handleOnClick = (tile, scenario) => {
        if (scenario.selectedUnit instanceof Unit)
            scenario.selectedUnit.moveTo(tile);
        else
            tile.select();
    }


    return {
        view: (vNode) => {
            const {attrs} = vNode;
            const {activeScenarioDefinition} = scenarioDefinitionStore;

            const {hex, size, margin} = attrs;
            const height = size * 1.1547;
            const marginBottom = margin - size * 0.2885;
            const selectedUnit = activeScenarioDefinition.selectedUnit;


            return (
                m('div.', {
                    className: classNames('inline-block text-base bg-primary align-top hover:!cursor-pointer hover:!bg-interaction disabled:opacity-50', {
                        '!cursor-pointer !bg-interaction': hex.isSelected,
                        '!bg-interaction': selectedUnit?.canMoveTo[hex.id] >= 0,
                        '!bg-warning': hex.isContested
                    }),
                    style: {width: `${size}px`, height: `${height}px`, margin: `${margin}px`,
                        'background-color': `${hex.terrain?.color}`,
                        'margin-bottom': `${marginBottom}px`,
                        'clip-path': 'polygon(0% 25%, 0% 75%, 50% 100%, 100% 75%, 100% 25%, 50% 0%)'
                    },
                    onclick: () => handleOnClick(hex, activeScenarioDefinition)
                }, m('div', {
                    className: 'relative',
                    style: {'padding-top': `${size / 3.5}px`, 'padding-bottom': `${size / 3.5}px`}
                }, [
                    activeScenarioDefinition.devMode || m('span', hex.id),
                    Object.keys(hex.units).map((faction_name) => {
                        return hex.units[faction_name].map((unit) => {
                            return m('div', {className: 'absolute top-1/2 left-1/2 -translate-x-1/2'}, m(UnitCard, {unit: unit}))
                        })
                    })
                ]))
            )
        }
    }
}

export default HexTile;