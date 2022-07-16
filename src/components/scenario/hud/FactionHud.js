const m = require("mithril");

import scenarioStore from "../../../stores/ScenarioStore.js";


const FactionHud = (initialVnode) => {


    return {
        view: (vNode) => {
            const {activeScenario} = scenarioStore;


            return (
                m('div', {className: 'absolute top-4 left-4 p-4 bg-background rounded'}, activeScenario.currentTurn.name)
            )
        }
    }
}

export default FactionHud;