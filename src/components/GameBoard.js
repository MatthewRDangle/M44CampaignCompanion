const m = require("mithril");
import HexGrid from "./HexGrid.js";
import Hud from "./Hud.js";
import Unit from "../classes/Unit.js";
import Tile from "../classes/Tile.js";
import {activeScenario} from "../singletons/ActiveScenarioManager.js";

const GameBoard = (initialVnode) => {

    const handleRightClick = (e) => {
        if (activeScenario.selectedUnit instanceof Unit)
            activeScenario.selectedUnit.deselect();
        else if (activeScenario.selectedTile instanceof Tile)
            activeScenario.selectedTile.deselect();
    }

    return {
        view: (vNode) => {
            const {attrs} = vNode;

            return (
                m('div.gameBoard', {
                    oncontextmenu: handleRightClick
                }, [
                    m('div.gameBoard_body', m(HexGrid, {grid: activeScenario.tiles})),
                    m('div.gameBoard_hud', [
                        m(Hud, {activeScenario: activeScenario})
                    ])
                ])
            )
        }
    }
}

export default GameBoard;