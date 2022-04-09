const m = require("mithril");
import {activeScenario} from "../../global.js";

const NextTurnHud = (initialVnode) => {

    const handleNextTurn = (e) => {
        activeScenario.nextTurn();
    }

    return {
        view: (vNode) => {
            const {attrs} = vNode;

            return (
                m('div.nextTurnHud',
                    m('button.nextTurnHud_button', {onclick: handleNextTurn}, [
                        m('div.nextTurnHud_button_play')
                    ]),
                    m('span.nextTurnHud_label', attrs.label || 'Next Turn')
                )
            )
        }
    }
}

export default NextTurnHud;