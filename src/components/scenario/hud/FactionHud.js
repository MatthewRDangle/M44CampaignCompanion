const m = require("mithril");

import ScenarioDefinitionStore from "../../../stores/ScenarioDefinition.store.js";


const FactionHud = (initialVnode) => {


    return {
        view: (vNode) => {
            const {activeScenarioDefinition} = ScenarioDefinitionStore;


            return (
                m('div', {className: 'absolute top-4 left-4 p-4 bg-background rounded'}, activeScenarioDefinition.currentTurn.name)
            )
        }
    }
}

export default FactionHud;