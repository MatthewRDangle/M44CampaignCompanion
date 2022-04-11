const m = require("mithril");
import {activeScenario} from "../../global.js";

const FactionHud = (initialVnode) => {

    return {
        view: (vNode) => {
            const {attrs} = vNode;

            return (
                m('div.factionHud', activeScenario.currentTurn.name)
            )
        }
    }
}

export default FactionHud;