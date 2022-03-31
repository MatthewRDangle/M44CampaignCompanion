const m = require("mithril");

const HexTile = (initialVnode) => {

    return {
        view: (vNode) => {
            const {attrs} = vNode;
            const unit = attrs.unit;

            return (
                m('div.unitCard', {className: `${attrs.selectable ? 'unitCard-selectable' : undefined}`}, [
                    m('div.unitCard_count', unit.health || 0),
                    m('div.unitCard_picture',
                        m('div.unitCard_picture_icon')
                    ),
                    m('div.unitCard_name', unit.name)
                ])
            )
        }
    }
}

export default HexTile;