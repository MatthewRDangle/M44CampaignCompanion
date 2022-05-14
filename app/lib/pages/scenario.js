const m = require('mithril');
import Page from '../classes/Page.js';
import GameBoard from "../components/GameBoard.js"


export const page = new Page('/scenario?:key', (initialVnode) => {

    return {
        view: (vNode) => {
            const {attrs} = vNode;
            const key = attrs.key;

            return m(GameBoard)
        }
    }
});
