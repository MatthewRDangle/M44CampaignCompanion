const m = require("mithril");

import NextTurnHud from "./NextTurnHud.js";
import OptionHud from "./OptionHud.js";
import TileInfoHud from "./TileInfoHud.js";
import FactionHud from "./FactionHud.js";


const GameBoard = (initialVnode) => {


    return {
        view: (vNode) => {
            const {attrs} = vNode;
            const {selectedTile, currentTurn} = attrs.scenario;


            return (
                m('div.hud', [
                    m('div.hud_faction', m(FactionHud)),
                    m('div.hud_game', m(OptionHud)),
                    m('div.hud_tile', selectedTile ? m(TileInfoHud, {tile: selectedTile, currentTurn: currentTurn}) : ''),
                    m('div.hud_nextTurn', m(NextTurnHud))
                ])
            )
        }
    }
}

export default GameBoard;