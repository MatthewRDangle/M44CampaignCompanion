import m from 'mithril';
import NextTurnHud from "./NextTurnHud.view.js";
import TileInfoHud from "./TileInfoHud.view.js";
import HeaderHud from "./HeaderHud.view.js";
import GameOverHud from "./GameOverHud.view.js";
import modeStore from "../../../stores/Mode.store.js";


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