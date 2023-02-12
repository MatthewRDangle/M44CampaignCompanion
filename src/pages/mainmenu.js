const m = require('mithril');

import Page from '../classes/Page.js';
import Body from "../components/Body.js";
import Nav from "../components/Nav.js";


export const page = new Page('/mainmenu', (initialVnode) => {


    return {
        view: (vNode) => {
            const {attrs} = vNode;


            return m(Body, [
                m(Nav),
                m('div')
            ])
        }
    }
});