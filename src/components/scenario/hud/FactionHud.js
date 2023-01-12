const m = require("mithril");

import scenarioManifestStore from "../../../stores/ScenarioManifest.store.js";


const FactionHud = (initialVnode) => {


    return {
        view: (vNode) => {
            const {activeScenario} = scenarioManifestStore;


            return (
                m('div', {className: 'absolute top-4 left-4 p-4 bg-background rounded'}, activeScenario.currentTurn.name)
            )
        }
    }
}

export default FactionHud;