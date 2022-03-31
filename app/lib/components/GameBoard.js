const m = require("mithril");
import HexGrid from "./HexGrid.js";
import Hud from "./Hud.js";
import {global} from "../../global.js";
import Tile from "../classes/Tile.js";

const GameBoard = (initialVnode) => {

    return {
        view: (vNode) => {
            const {attrs} = vNode;
            const activeScenario = attrs.activeScenario;

            return (
                m('div.gameBoard', {
                    oncontextmenu: (e) => {
                        const activeScenario = global.getValue('activeScenario')
                        if (activeScenario.selectedTile instanceof Tile)
                            activeScenario.selectedTile.unselect();
                    }
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