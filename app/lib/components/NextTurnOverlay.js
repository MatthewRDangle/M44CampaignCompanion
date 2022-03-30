const m = require("mithril");

const NextTurnOverlay = (initialVnode) => {

    return {
        view: (vNode) => {
            const {attrs} = vNode;

            return (
                m('div.nextTurnOverlay',
                    m('button.nextTurnOverlay_button', {onclick: attrs.onclick}, [
                        m('div.nextTurnOverlay_button_play')
                    ]),
                    m('span.nextTurnOverlay_label', attrs.label || 'Next Turn')
                )
            )
        }
    }
}

export default NextTurnOverlay;