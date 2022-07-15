const m = require('mithril');

import Page from '../classes/Page.js';
import Body from "../components/Body.js";


export const page = new Page('/mainMenu', (initialVnode) => {


    return {
        view: (vNode) => {
            const {attrs} = vNode;


            return m(Body)
        }
    }
});