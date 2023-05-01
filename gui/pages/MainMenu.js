const m = require('mithril');

import Page from '../models/Page.js';
import Body from "../components/Body.js";
import Nav from "../components/Nav.js";
import NavTitle from "../components/NavTitle.js";


export const page = new Page('/mainmenu', (initialVnode) => {


    return {
        view: (vNode) => {


            return m(Body, [
                m('img', {
                    className: 'absolute top-0 left-0 object-cover w-full h-full -z-10',
                    src: 'images/background.png',
                    role: 'presentation'
                }),
                m('div', {className: 'absolute top-[12vw] left-[10vw]'}, [
                    m(NavTitle, 'Main Menu'),
                    m(Nav),
                ]),
                m('div', {className: 'flex justify-between absolute top-0 left-1/2 w-1/2 h-full'}, [
                    m('div', {className: 'bg-tertiary border-x-4 border-solid border-secondary-500 w-[22vw] -skew-x-[18deg] h-full'}),
                    m('div', {className: 'bg-tertiary border-x-4 border-solid border-secondary-500 w-[22vw] -skew-x-[18deg] h-full'})
                ])
            ])
        }
    }
});