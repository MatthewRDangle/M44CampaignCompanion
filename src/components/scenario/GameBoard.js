const m = require("mithril");

import HexGrid from "./HexGrid.js";
import Hud from "../hud/Hud.js";
import Unit from "../../classes/Unit.js";
import Tile from "../../classes/Tile.js";


const GameBoard = (initialVnode) => {

    const handleRightClick = (scenario) => {
        if (scenario.selectedUnit instanceof Unit)
            scenario.selectedUnit.deselect();
        else if (scenario.selectedTile instanceof Tile)
            scenario.selectedTile.deselect();
    }


    return {
        view: (vNode) => {
            const {attrs} = vNode;
            const scenario = attrs.scenario;


            return (
                m('div.gameBoard', {
                    oncontextmenu: () => handleRightClick(scenario)
                }, [
                    m('div.gameBoard_body', m(HexGrid, {grid: scenario.tiles})),
                    m('div.gameBoard_hud', [
                        m(Hud, {scenario: scenario})
                    ])
                ])
            )
        }
    }
}

export default GameBoard;