const m = require("mithril");

import scenarioStore from '../../../stores/ScenarioStore.js';


const NextTurnHud = (initialVnode) => {

    const handleNextTurn = (scenario) => {
        scenario.nextTurn();
    }


    return {
        view: (vNode) => {
            const {attrs} = vNode;
            const {activeScenario} = scenarioStore;


            return (
                m('div', {className: 'absolute bottom-8 right-8 z-1'},
                    m('button', {className: 'block bg-background rounded-full border-border w-16 h-16 m-auto mb-2 cursor-pointer', onclick: () => handleNextTurn(activeScenario)}, [
                        m('div', {className: 'w-6 h-6 m-auto bg-font'})
                    ]),
                    m('span', {className: 'block bg-background text-fond p-1 rounded-3'}, attrs.label || 'Next Turn')
                )
            )
        }
    }
}

export default NextTurnHud;