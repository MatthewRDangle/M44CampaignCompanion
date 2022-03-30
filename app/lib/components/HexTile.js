const m = require("mithril");

const HexTile = (initialVnode) => {

    return {
        view: (vNode) => {
            const {attrs} = vNode;
            const tile = attrs.tile;

            return (
                m('div.hexTile', {onclick: () => {
                    console.log('clicked')
                }})
            )
        }
    }
}

export default HexTile;