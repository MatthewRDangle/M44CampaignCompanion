const m = require("mithril");
const classNames = require("classnames");

import PlayableUnit from "./PlayableUnit.js";
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
            const overlays = Object.values(hex.overlays);
            const height = size * 1.1547;
            const marginBottom = margin - size * 0.2885;
            const selectedUnit = activeScenarioDefinition.selectedUnit;


            return (
                m('div.', {
                    className: classNames('inline-block text-base align-top disabled:opacity-50', {
                        'hover:!cursor-pointer hover:!bg-interaction-900': !!hex.render || hex.render === undefined,
                        '!cursor-pointer !bg-interaction-900': hex.isSelected,
                        '!bg-interaction-900': selectedUnit?.canMoveTo[hex.id] >= 0,
                        '!bg-warning': hex.isContested
                    }),
                    style: {width: `${size}px`, height: `${height}px`, margin: `${margin}px`,
                        'background-color': `${hex.terrain?.color}`,
                        'margin-bottom': `${marginBottom}px`,
                        'clip-path': 'polygon(0% 25%, 0% 75%, 50% 100%, 100% 75%, 100% 25%, 50% 0%)'
                    },
                    onclick: () => handleOnClick(hex, activeScenarioDefinition)
                    }, [
                        overlays.map(overlay => overlay.images.map(image =>
                            m('img', {
                                className: 'w-full h-full object-cover',
                                src: image.src,
                                alt: image.alt,
                            })
                        )),
                        m('div', {className: 'relative w-full h-full overflow-hidden'}, [
                            !!activeScenarioDefinition.devMode
                                ? m('span', hex.id)
                                : '',
                            Object.keys(hex.units).map((faction_name) =>
                                m('div', {className: 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'}, [
                                    m(PlayableUnit, {
                                        faction: activeScenarioDefinition.factions[faction_name],
                                        units: hex.units[faction_name]
                                    })
                                ])
                            )
                        ])
                    ]
                )
            )
        }
    }
}

export default HexTile;