const m = require("mithril");

import HexTile from "./templates/HexTile.js";


const HexGrid = (initialVnode) => {
    const hexSize = 200;
    const hexMargin = 1;
    const rowEvenOffset = hexSize / 2 + hexMargin;


    return {
        view: (vNode) => {
            const {attrs} = vNode;
            const grid = attrs.grid || [];


            return (
                m('div', {className: 'flex flex-wrap'}, [
                    grid.map((row, idx) => {
                        return m('div', {
                            className: 'flex-none text-none min-w-full',
                            style: (() => !(idx % 2) && {
                                'margin-left': `${rowEvenOffset}px`
                            })()
                        }, Object.values(row).map((tile) => {
                            return m(HexTile, {hex: tile, size: hexSize, margin: hexMargin})
                        }))
                    })
                ])
            )
        }
    }
}

export default HexGrid;