const m = require("mithril");

import scenarioStore from '../../stores/ScenarioStore.js';


const NextTurnHud = (initialVnode) => {

    const handleNextTurn = (scenario) => {
        scenario.nextTurn();
    }


    return {
        view: (vNode) => {
            const {attrs} = vNode;
            const {activeScenario} = scenarioStore;


            return (
                m('div.nextTurnHud',
                    m('button.nextTurnHud_button', {onclick: () => handleNextTurn(activeScenario)}, [
                        m('div.nextTurnHud_button_play')
                    ]),
                    m('span.nextTurnHud_label', attrs.label || 'Next Turn')
                )
            )
        }
    }
}

export default NextTurnHud;