const m = require("mithril");
const classNames = require("classnames");

const HexTile = (initialVnode) => {


    return {
        view: (vNode) => {
            const {attrs} = vNode;
            const unit = attrs.unit;
            const factionColor = unit.faction?.color;


            return (
                m('div.unitCard', {
                    className: classNames(
                        {'unitCard--selectable': attrs.onclick},
                        {'unitCard--selected': unit.isSelected},
                        {'unitCard--exhausted': !unit.available_movement}
                    ),
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