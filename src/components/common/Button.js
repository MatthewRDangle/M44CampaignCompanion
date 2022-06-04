const m = require("mithril");

const Button = (initialVnode) => {


    return {
        view: (vNode) => {
            const {attrs} = vNode;


            return (
                m('button.button', attrs, vNode.children)
            )
        }
    }
}

export default Button;