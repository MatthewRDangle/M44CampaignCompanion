const m = require("mithril");

import NextTurn from "./hud/NextTurn.js";
import TileInfo from "./hud/TileInfo.js";
import GameHeader from "./hud/GameHeader.js";
import GameOver from "./hud/GameOver.js";


const GameBoard = (initialVnode) => {


    return {
        view: (vNode) => {
            const {attrs} = vNode;
            const {selectedTile, currentTurn, isGameOver} = attrs.scenario;


            return ([
                !!isGameOver
                    ? m(GameOver, {currentTurn: currentTurn})
                    : '',
                m(GameHeader),
                !!selectedTile
                    ? m(TileInfo, {tile: selectedTile, currentTurn: currentTurn})
                    : '',
                m(NextTurn)
            ])
        }
    }
}

export default GameBoard;