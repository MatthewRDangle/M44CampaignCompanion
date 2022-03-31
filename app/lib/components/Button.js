const m = require("mithril");

const Button = (initialVnode) => {

    return {
        view: (vNode) => {
            const {attrs} = vNode;

            return (
                m('button.button', {onclick: attrs.onclick},
                    m('button_text', attrs.text || 'button')
                )
            )
        }
    }
}

export default Button;