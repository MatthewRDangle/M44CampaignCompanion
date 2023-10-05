const m = require("mithril");
const classNames = require("classnames");

import UnitToken from "../token/ConcealedUnitToken.component.js";
import definitionStore from "../../stores/Definition.store.js";
import modeStore from "../../stores/Mode.store.js";


const BoardTile = (initialVnode) => {
    const handleOnClick = (tile) => {
        if (!!tile.terrain?.render || tile.terrain?.render === undefined) {
            if (modeStore.isMovementMode) {
                const moves = modeStore.possibleMoves[tile.id]
                if (!moves) return
                modeStore.possibleMoves[tile.id].forEach(move => {
                    const {unit, cost} = move;
                    unit.move(tile, cost);
                })
            } else if (modeStore.isDirectAttackMode) {
                const attacks = modeStore.possibleDirectAttacks[tile.id]
                if (!attacks) return
                modeStore.possibleMoves[tile.id].forEach(attack => {
                    const { unit, weapon } = attack;
                    unit.attack(tile, weapon);
                })
            } else if (modeStore.isIndirectFireMode) {
                const attacks = modeStore.possibleIndirectAttacks[tile.id]
                if (!attacks) return
                modeStore.possibleMoves[tile.id].forEach(attack => {
                    const { unit, weapon } = attack;
                    unit.attack(tile, weapon);
                })
            } else {
                tile.select();
            }
        }
    }


    return {
        view: (vNode) => {
            const {attrs} = vNode;
            const {activeScenarioDefinition} = definitionStore;

            const { isMovementMode, isIndirectFireMode, possibleMoves, possibleIndirectAttacks } = modeStore;
            const { hex, size, margin } = attrs;
            const overlays = Object.values(hex.overlays);
            const height = size * 1.1547;
            const marginBottom = margin - size * 0.2885;


            return (
                m('div.', {
                    className: classNames('relative inline-block text-base align-top disabled:opacity-50', {
                        'hover:!cursor-pointer hover:!bg-interaction-900': !!hex.terrain?.render || hex.terrain?.render === undefined,
                        '!cursor-pointer !bg-interaction-900': hex.isSelected,
                        '!bg-interaction-900': isMovementMode && possibleMoves[hex.id] >= 0,
                        '!bg-warning-900': isIndirectFireMode && possibleIndirectAttacks[hex.id],
                        '!bg-warning-500': hex.isContested
                    }),
                    style: {width: `${size}px`, height: `${height}px`, margin: `${margin}px`,
                        'background-color': `${hex.terrain?.color}`,
                        'margin-bottom': `${marginBottom}px`,
                        'clip-path': 'polygon(0% 25%, 0% 75%, 50% 100%, 100% 75%, 100% 25%, 50% 0%)'
                    },
                    onclick: () => handleOnClick(hex)
                    }, [
                        overlays.map(overlay => overlay.images.map(image =>
                            m('img', {
                                className: 'absolute w-full h-full object-cover',
                                role: "presentation",
                                src: image,
                                alt: "",
                            })
                        )),
                        m('div', {className: 'relative w-full h-full overflow-hidden'}, [
                            !!activeScenarioDefinition.devMode
                                ? m('span', {className: 'block w-full text-5xl text-center'}, hex.id)
                                : '',
                            Object.keys(hex.units).map((faction_name) =>
                                m('div', {className: 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'}, [
                                    m(UnitToken, {
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

export default BoardTile;