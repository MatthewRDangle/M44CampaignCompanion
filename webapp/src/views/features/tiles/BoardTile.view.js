import m from 'mithril';
import classNames from "classNames";
import UnitToken from "../token/ConcealedUnitToken.view.js";
import definitionStore from "../../../stores/Definition.store.js";
import modeStore from "../../../stores/Mode.store.js";


const BoardTile = (initialVnode) => {
    const handleOnClick = (tile) => {
        if (!!tile.terrain?.render || tile.terrain?.render === undefined) {
            if (modeStore.isMovementMode) {
                const moves = modeStore.possibleMoves[tile.id]
                if (!moves) return
                if (Array.isArray(moves)) {
                    moves.forEach(move => {
                        const {unit, cost} = move;
                        unit.move(tile, cost);
                    })
                } else {
                    const {unit, cost} = moves;
                    unit.move(tile, cost);
                }
                modeStore.disableMovementMode()
            } else if (modeStore.isDirectAttackMode) {
                const attacks = modeStore.possibleDirectAttacks[tile.id]
                if (!attacks) return
                if (Array.isArray(attacks)) {
                    attacks.forEach(attack => {
                        const { unit, cost } = attack;
                        unit.directAttack(tile, cost);
                    })
                } else {
                    const { unit, cost } = attacks;
                    unit.directAttack(tile, cost);
                }
                modeStore.disableDirectAttackMode()
            } else if (modeStore.isIndirectFireMode) {
                const attacks = modeStore.possibleIndirectAttacks[tile.id]
                if (!attacks) return
                if (Array.isArray(attacks)) {
                    attacks.forEach(attack => {
                        const { unit, tile } = attack;
                        unit.indirectAttack(tile)
                    })
                } else {
                    const { unit, tile } = attacks;
                    unit.indirectAttack(tile)
                }
                modeStore.disableIndirectFireMode()
            } else {
                modeStore.enableCommandMode()
                tile.select();
            }
        }
    }


    return {
        view: (vNode) => {
            const {attrs} = vNode;
            const {activeScenarioDefinition} = definitionStore;

            const { isMovementMode, isDirectAttackMode, isIndirectFireMode, possibleMoves, possibleDirectAttacks, possibleIndirectAttacks } = modeStore;
            const { hex, size, margin } = attrs;
            const overlays = Object.values(hex.overlays);
            const height = size * 1.1547;
            const marginBottom = margin - size * 0.2885;


            return (
                m('div.', {
                    className: classNames('relative inline-block text-base align-top disabled:opacity-50', {
                        'hover:!cursor-pointer hover:!bg-interaction-900': !!hex.terrain?.render || hex.terrain?.render === undefined,
                        '!cursor-pointer !bg-interaction-900': hex.isSelected,
                        '!bg-interaction-900': isMovementMode && possibleMoves[hex.id],
                        '!bg-warning-900': (isDirectAttackMode && possibleDirectAttacks[hex.id]) || (isIndirectFireMode && possibleIndirectAttacks[hex.id]),
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
                                className: 'absolute w-full h-full object-cover select-none',
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