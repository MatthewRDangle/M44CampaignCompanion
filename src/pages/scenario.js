const m = require('mithril');

import Page from '../classes/Page.js';
import GameBoard from "../components/GameBoard.js"


export const page = new Page('/scenario?:id', (initialVnode) => {

    return {
        view: (vNode) => {
            const {attrs} = vNode;
            const {id} = attrs;

            return m(GameBoard)
        }
    }
});
