const m = require("mithril");

import NextTurnHud from "./NextTurnHud.component.js";
import TileInfoHud from "./TileInfoHud.component.js";
import HeaderHud from "./HeaderHud.component.js";
import GameOverHud from "./GameOverHud.component.js";


const MainHead = (initialVnode) => {


    return {
        view: (vNode) => {
            const {attrs} = vNode;
            const {selectedTile, currentTurn, isGameOver} = attrs.scenario;


            return ([
                !!isGameOver
                    ? m(GameOverHud, {currentTurn: currentTurn})
                    : '',
                m(HeaderHud),
                !!selectedTile
                    ? m(TileInfoHud, {tile: selectedTile, currentTurn: currentTurn})
                    : '',
                m(NextTurnHud)
            ])
        }
    }
}

export default MainHead;