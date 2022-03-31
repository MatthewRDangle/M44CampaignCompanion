const m = require("mithril");

const HexTile = (initialVnode) => {

    return {
        view: (vNode) => {
            const {attrs} = vNode;
            const unit = attrs.unit;

            return (
                m('div.unitCard', [
                    m('div.unitCard_count', unit.health || 0),
                    m('div.unitCard_name', unit.name)
                ])
            )
        }
    }
}

export default HexTile;