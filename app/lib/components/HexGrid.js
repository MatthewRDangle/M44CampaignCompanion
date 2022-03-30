import HexTile from "./HexTile.js";

const m = require("mithril");

const HexGrid = (initialVnode) => {

    return {
        view: (vNode) => {
            const {attrs} = vNode;
            const grid = attrs.grid || [];

            return (
                m('div.hexGrid', [
                    grid.map((row) => {
                        if (Array.isArray(row)) {
                            return m('div.hexGrid_row', row.map((hex) => {
                                m(HexTile, {id: hex.id})
                            }))
                        }
                    })
                ])
            )
        }
    }
}

export default HexGrid;