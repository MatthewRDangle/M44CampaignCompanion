const m = require('mithril');

import Page from '../classes/Page.js';
import Body from "../components/Body.js";
import Quotes from "../components/templates/Quotes.js";
import LoadingStatus from "../components/templates/LoadingStatus.js";


export const page = new Page('/splash', (initialVnode) => {


    return {
        view: (vNode) => {
            const {attrs} = vNode;

            setTimeout(() => {
                m.route.set("mainmenu")
            }, 5000)


            return m(Body, [
                m('img', {
                    className: 'absolute top-0 left-0 object-cover w-full h-full',
                    src: 'src/images/loading.png',
                    alt: 'BattleCry'
                }),
                m('div', {className: 'absolute top-1/2'}, [
                    m('div', {className: 'relative w-screen'}, [
                        m(LoadingStatus, {className: 'absolute -top-[250px] left-1/2 -translate-x-1/2 text-center text-xl'}),
                        m(Quotes, {className: 'absolute -bottom-[275px] left-1/2 -translate-x-1/2 text-center w-3/2'})
                    ])
                ])
            ])
        }
    }
});