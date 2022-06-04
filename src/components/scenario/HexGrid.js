const m = require("mithril");

import HexTile from "./HexTile.js";


const HexGrid = (initialVnode) => {


    return {
        view: (vNode) => {
            const {attrs} = vNode;
            const grid = attrs.grid || [];


            return (
                m('div.hexGrid', [
                    grid.map((row) => {
                        return m('div.hexGrid_row', Object.values(row).map((tile) => {
                            return m(HexTile, {hex: tile})
                        }))
                    })
                ])
            )
        }
    }
}

export default HexGrid;