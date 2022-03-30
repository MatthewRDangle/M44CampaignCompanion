import HexTile from "./HexTile.js";

const m = require("mithril");

const HexGrid = (initialVnode) => {

    return {
        view: (vNode) => {
            const {attrs} = vNode;

            return (
                m('div.hexGrid', [
                    m('div.hexGrid_row', [
                        m(HexTile),
                        m(HexTile),
                        m(HexTile),
                        m(HexTile),
                        m(HexTile),
                        m(HexTile),
                        m(HexTile),
                        m(HexTile),
                        m(HexTile),
                        m(HexTile),
                        m(HexTile),
                        m(HexTile),
                        m(HexTile),
                        m(HexTile),
                        m(HexTile),
                        m(HexTile),
                        m(HexTile),
                        m(HexTile),
                        m(HexTile),
                        m(HexTile),
                        m(HexTile),
                        m(HexTile),
                        m(HexTile),
                        m(HexTile)
                    ])
                ])
            )
        }
    }
}

export default HexGrid;