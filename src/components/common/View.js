const m = require("mithril");

const View = (initialVnode) => {


    return {
        view: (vNode) => {
            const {attrs} = vNode;


            return m('div.view', vNode.children)
        }
    }
}

export default View;