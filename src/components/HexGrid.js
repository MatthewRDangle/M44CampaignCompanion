const m = require("mithril");

import HexTile from "./templates/HexTile.js";


const HexGrid = (initialVnode) => {


    return {
        view: (vNode) => {
            const {attrs} = vNode;
            const grid = attrs.grid || [];

            let hexSize = 200;
            let hexMargin = 1;
            let rowEvenOffset = hexSize / 2 + hexMargin;


            return (
                m('div', {className: 'flex flex-wrap scale-50'}, [
                    grid.map((row, idx) => {
                        return m('div', {
                            className: `flex-none text-none min-w-full`,
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