import m from 'mithril';
import BoardTile from "..//tiles/BoardTile.view.js";
import ScenarioDefinitionStore from "../../../stores/Definition.store.js";


const HexGrid = (initialVnode) => {


    return {
        view: (vNode) => {
            const {activeScenarioDefinition} = ScenarioDefinitionStore;
            const {attrs} = vNode;
            const {hexSize, hexMargin, rowEvenOffset} = attrs;
            const grid = attrs.grid || [];
            const columns = activeScenarioDefinition.columns;
            const width = hexSize * columns + hexSize / 2 + hexMargin * 2 * columns;

            return (
                m('div', {className: 'flex flex-wrap', style: `width: ${width}px;`}, [
                    grid.map((row, idx) => {
                        return m('div', {
                            className: 'flex-none text-none min-w-full',
                            style: (() => !(idx % 2) && {
                                'margin-left': `${rowEvenOffset}px`
                            })()
                        }, Object.values(row).map((tile) => {
                            return m(BoardTile, {hex: tile, size: hexSize, margin: hexMargin})
                        }))
                    })
                ])
            )
        }
    }
}

export default HexGrid;