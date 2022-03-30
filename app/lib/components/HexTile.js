const m = require("mithril");

const HexTile = (initialVnode) => {

    return {
        view: (vNode) => {
            const {attrs} = vNode;

            return (
                m('div.hexTile')
            )
        }
    }
}

export default HexTile;