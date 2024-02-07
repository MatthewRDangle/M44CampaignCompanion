import m from 'mithril';

import ScenarioDefinitionStore from "../../stores/Definition.store.js";


const NextTurnHud = (initialVnode) => {

    const handleNextTurn = (scenario) => {
        scenario.nextTurn();
    }


    return {
        view: (vNode) => {
            const {attrs} = vNode;
            const {activeScenarioDefinition} = ScenarioDefinitionStore;
            const color = activeScenarioDefinition.currentTurn.color

            return (
                m('div', {className: 'group absolute bottom-8 right-8 z-1 shadow-background-500/50 select-none'},
                    m('button', {
                        className: 'block w-16 h-16 p-3 pl-4 m-auto mb-2 bg-tertiary group-hover:bg-interaction border-2 border-solid border-interaction rounded-full cursor-pointer',
                        disabled: activeScenarioDefinition?.isGameOver,
                        onclick: () => handleNextTurn(activeScenarioDefinition)
                    }, m('div', {
                            className: 'block w-full h-full p-[7%] m-auto bg-font group-hover:bg-background',
                            style: {
                                'clip-path': 'polygon(0% 0%, 0% 100%, 100% 50%)'
                            },
                        }, m('div', {
                                className: 'relative right-[4%] block w-full h-full p-[10%] m-auto bg-background',
                                style: {
                                    'clip-path': 'polygon(0% 0%, 0% 100%, 100% 50%)'
                                },
                            }, m('div', {
                                    className: 'relative right-[4%] block w-full h-full m-auto bg-font group-hover:bg-background',
                                    style: {
                                        'clip-path': 'polygon(0% 0%, 0% 100%, 100% 50%)'
                                    },
                                })
                            )
                        )
                    ),
                    m('span', {className: 'block px-4 py-1 text-sm text-font group-hover:text-background bg-background group-hover:bg-interaction rounded-full shadow-lg'}, attrs.label || 'Next Turn')
                )
            )
        }
    }
}

export default NextTurnHud;