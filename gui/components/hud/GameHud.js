const m = require("mithril");

import NextTurn from "./NextTurn.js";
import TileInfo from "./TileInfo.js";
import GameHeader from "./GameHeader.js";
import GameOver from "./GameOver.js";


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