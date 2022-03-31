const m = require("mithril");

const FactionHud = (initialVnode) => {

    return {
        view: (vNode) => {
            const {attrs} = vNode;

            return (
                m('div.factionHud')
            )
        }
    }
}

export default FactionHud;