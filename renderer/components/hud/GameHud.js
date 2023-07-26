const m = require("mithril");

import NextTurnHud from "./NextTurnHud.js";
import TileInfoHud from "./TileInfoHud.js";
import GameHeaderHud from "./GameHeaderHud.js";
import GameOverHud from "./GameOverHud.js";


const GameBoard = (initialVnode) => {


    return {
        view: (vNode) => {
            const {attrs} = vNode;
            const {selectedTile, currentTurn, isGameOver} = attrs.scenario;


            return ([
                !!isGameOver
                    ? m(GameOverHud, {currentTurn: currentTurn})
                    : '',
                m(GameHeaderHud),
                !!selectedTile
                    ? m(TileInfoHud, {tile: selectedTile, currentTurn: currentTurn})
                    : '',
                m(NextTurnHud)
            ])
        }
    }
}

export default GameBoard;