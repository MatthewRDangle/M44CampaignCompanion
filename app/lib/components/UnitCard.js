const m = require("mithril");

const HexTile = (initialVnode) => {

    return {
        view: (vNode) => {
            const {attrs} = vNode;
            const unit = attrs.unit;
            const factionColor = unit.faction?.color;
            console.log(factionColor);
            return (
                m('div.unitCard', {
                    className: `${attrs.onclick ? 'unitCard--selectable' : ''} ${unit.isSelected ? 'unitCard--selected' : ''}`,
                    style: {color: factionColor?.text, 'background-color': factionColor?.background},
                    onclick: attrs.onclick
                }, [
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