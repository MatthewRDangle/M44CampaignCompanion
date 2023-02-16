const m = require("mithril");

import NextTurn from "./gamehud/NextTurn.js";
import TileInfo from "./gamehud/TileInfo.js";
import GameHeader from "./gamehud/GameHeader.js";
import GameOver from "./gamehud/GameOver.js";


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