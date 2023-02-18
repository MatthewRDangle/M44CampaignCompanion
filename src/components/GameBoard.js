const m = require("mithril");
const classnames = require("classnames");


import HexGrid from "./HexGrid.js";
import Hud from "./GameHud.js";
import Unit from "../classes/Unit.js";
import Tile from "../classes/Tile.js";


const GameBoard = (initialVnode) => {

    const handleRightClick = (scenario) => {
        if (scenario.selectedUnit instanceof Unit)
            scenario.selectedUnit.deselect();
        else if (scenario.selectedTile instanceof Tile)
            scenario.selectedTile.deselect();
    }

    let isBeingDragged = false
    let scale = 0.5;
    const position = {
        top: -300,
        left: -300
    }
    const mouse = {
        ix: 0,
        iy: 0,
        nx: 0,
        ny: 0
    }

    const handleScale = (e) => {
        const delta = Math.sign(e.deltaY);
        if (delta > 0)
            scale = scale + .01;
        else if (delta < 0)
            scale = scale - .01;
    }

    const handleDragStart = (e) => {
        e.preventDefault();
        isBeingDragged = true;
        mouse.ix = e.clientX;
        mouse.iy = e.clientY;
    }
    const handleDragging = (e) => {
        e.preventDefault();
        if (isBeingDragged) {
            mouse.nx = mouse.ix - e.clientX;
            mouse.ny = mouse.iy - e.clientY;
            mouse.ix = e.clientX;
            mouse.iy = e.clientY;

            position.left = position.left - mouse.nx;
            position.top = position.top - mouse.ny;
        }
    }
    const handleDragEnd = (e) => {
        e.preventDefault();
        isBeingDragged = false;
    }


    return {
        view: (vNode) => {
            const {attrs} = vNode;
            const scenario = attrs.scenario;


            return (
                m('div', {className: 'relative w-full h-full overflow-hidden',
                    onwheel: handleScale,
                    oncontextmenu: () => handleRightClick(scenario)
                }, [
                    m('div', {
                        className: classnames('absolute',{
                            '!cursor-grabbing': !!isBeingDragged
                        }),
                        style: {
                            transform: `scale(${scale})`,
                            top: position.top + 'px',
                            left: position.left +'px'
                        },
                        onmousedown: handleDragStart,
                        onmousemove: handleDragging,
                        onmouseup: handleDragEnd
                    }, m(HexGrid, {grid: scenario.tiles})),
                    m('div', [
                        m(Hud, {scenario: scenario})
                    ])
                ])
            )
        }
    }
}

export default GameBoard;