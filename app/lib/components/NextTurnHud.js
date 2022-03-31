const m = require("mithril");

const NextTurnHud = (initialVnode) => {

    return {
        view: (vNode) => {
            const {attrs} = vNode;

            return (
                m('div.nextTurnHud',
                    m('button.nextTurnHud_button', {onclick: attrs.onclick}, [
                        m('div.nextTurnHud_button_play')
                    ]),
                    m('span.nextTurnHud_label', attrs.label || 'Next Turn')
                )
            )
        }
    }
}

export default NextTurnHud;