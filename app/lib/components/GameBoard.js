import HexGrid from "./HexGrid.js";

const m = require("mithril");

const GameBoard = (initialVnode) => {

    return {
        view: (vNode) => {
            const {attrs} = vNode;

            return (
                m('div.gameBoard', m(HexGrid))
            )
        }
    }
}

export default GameBoard;