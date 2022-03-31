const m = require("mithril");
import UnitCard from './UnitCard.js';

const HexTile = (initialVnode) => {

    return {
        view: (vNode) => {
            const {attrs} = vNode;
            const hex = attrs.hex;

            return (
                m('div.hexTile', {
                    className: `${hex.isSelected ? 'hexTile-selected' : ''}`,
                    onclick: (e) => {
                        hex.select();
                    }
                }, m('div.hexTile_body', [
                    Object.keys(hex.units).map((faction_name) => {
                        return hex.units[faction_name].map((unit) => {
                            return m(UnitCard, {unit: unit})
                        })
                    })
                ]))
            )
        }
    }
}

export default HexTile;