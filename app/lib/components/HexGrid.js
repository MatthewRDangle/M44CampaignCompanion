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
                            return m('div.hexGrid_row', row.map((tile) => {
                                return m(HexTile, {hex: tile})
                            }))
                        }
                    })
                ])
            )
        }
    }
}

export default HexGrid;