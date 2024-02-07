import m from 'mithril';

import NextTurnHud from "./NextTurnHud.component.js";
import TileInfoHud from "./TileInfoHud.component.js";
import HeaderHud from "./HeaderHud.component.js";
import GameOverHud from "./GameOverHud.component.js";
import modeStore from "../../stores/Mode.store.js";


const MainHead = (initialVnode) => {


    return {
        view: (vNode) => {
            const {attrs} = vNode;
            const {currentTurn, isGameOver} = attrs.scenario;
            const {selectedTile} = modeStore;


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