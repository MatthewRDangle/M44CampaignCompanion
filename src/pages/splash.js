const m = require('mithril');

import Page from '../classes/Page.js';
import Body from "../components/Body.js";


export const page = new Page('/splash', (initialVnode) => {

    const quote = '“Success in not final, failure is not fatal. It is the courage to continue that counts.” ~ Winston Churchill';


    return {
        view: (vNode) => {
            const {attrs} = vNode;


            return m(Body, [
                m('div', {className: 'text-center py-4'}, 'Loading'),
                m('div', {className: 'bg-primary h-1'}),
                m('h1', {className: 'text-center text-xl py-6'}, 'BattleCry'),
                m('div', {className: 'bg-primary h-1'}),
                m('div', {className: 'text-center py-4'}, quote)
            ])
        }
    }
});