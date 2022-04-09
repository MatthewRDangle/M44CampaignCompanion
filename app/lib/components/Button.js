const m = require("mithril");

const Button = (initialVnode) => {

    return {
        view: (vNode) => {
            const {attrs} = vNode;

            return (
                m('button.button', {onclick: attrs.onclick, disabled: attrs.disabled}, vNode.children)
            )
        }
    }
}

export default Button;