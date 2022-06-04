const m = require("mithril");

import scenarioStore from "../../stores/ScenarioStore.js";


const FactionHud = (initialVnode) => {


    return {
        view: (vNode) => {
            const {activeScenario} = scenarioStore;


            return (
                m('div.factionHud', activeScenario.currentTurn.name)
            )
        }
    }
}

export default FactionHud;