const m = require("mithril");
const classnames = require("classnames");


import HexGrid from "../HexGrid.component.js";
import Hud from "../hud/MainHud.component.js";
import Unit from "../../models/scenario/Unit.model.js";
import Tile from "../../models/scenario/Tile.model.js";
import boardStore from "../../stores/Board.store.js";
import definitionStore from "../../stores/Definition.store.js";
import modeStore from "../../stores/Mode.store.js";


const BoardGrid = (initialVnode) => {

    const handleRightClick = (scenario) => {
        if (modeStore.unitsAreSelected) {
            modeStore.deselectAllUnits()
            modeStore.enableCommandMode()
        }
        else if (modeStore.selectedTile)
            modeStore.deselectTile()
    }

    let isBeingDragged = false

    const mouse = {
        nx: 0,
        ny: 0
    }

    const handleScale = (e) => {
        const delta = Math.sign(e.deltaY);
        boardStore.setScale(delta)
    }

    const handleDragStart = (e) => {
        e.preventDefault();
        isBeingDragged = true;
        boardStore.mouseX = e.clientX;
        boardStore.mouseY = e.clientY;
    }

    const handleDragging = (e) => {
        e.preventDefault();
        if (isBeingDragged) {
            mouse.nx = boardStore.mouseX - e.clientX;
            mouse.ny = boardStore.mouseY - e.clientY;
            boardStore.mouseX = e.clientX;
            boardStore.mouseY = e.clientY;

            boardStore.positionLeft = boardStore.positionLeft - mouse.nx;
            boardStore.positionTop = boardStore.positionTop - mouse.ny;
        }
    }

    const handleDragEnd = (e) => {
        e.preventDefault();
        isBeingDragged = false;
    }


    return {
        view: (vNode) => {


            return (
                m('div', {className: 'relative w-full h-full overflow-hidden',
                    tabindex: 0,
                    onwheel: handleScale,
                    oncontextmenu: () => handleRightClick(definitionStore.activeScenarioDefinition),
                }, [
                    m('div', {
                        className: classnames('absolute',{
                            '!cursor-grabbing': !!isBeingDragged
                        }),
                        style: {
                            transform: `scale(${boardStore.scale})`,
                            top: boardStore.positionTop + 'px',
                            left: boardStore.positionLeft +'px'
                        },
                        onmousedown: handleDragStart,
                        onmousemove: !!isBeingDragged && handleDragging,
                        onmouseup: !!isBeingDragged && handleDragEnd
                    }, m(HexGrid, {grid: definitionStore.activeScenarioDefinition.tiles, hexSize: boardStore.hexSize, hexMargin: boardStore.hexMargin, rowEvenOffset: boardStore.rowEvenOffset})),
                    m('div', [
                        m(Hud, {scenario: definitionStore.activeScenarioDefinition})
                    ])
                ])
            )
        }
    }
}

export default BoardGrid;