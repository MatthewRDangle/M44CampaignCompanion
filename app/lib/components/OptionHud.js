const m = require("mithril");

const OptionHud = (initialVnode) => {

    return {
        view: (vNode) => {
            const {attrs} = vNode;

            return (
                m('div.optionHud',
                    m('button.optionHud_button', {onclick: attrs.onclick}, [
                        m('div.optionHud_bar'),
                        m('div.optionHud_bar'),
                        m('div.optionHud_bar')
                    ])
                )
            )
        }
    }
}

export default OptionHud;