import m from 'mithril';
import Page from '../models/Page.model.js';
import Body from "../components/layouts/Body.view.js";
import Quotes from "../components/primitives/Quotes.view.js";
import LoadingStatus from "../components/compounds/LoadingStatus.view.js";


export default new Page('/splash', (initialVnode) => {


    return {
        view: (vNode) => {
            const {attrs} = vNode;

            setTimeout(() => {
                m.route.set("mainmenu")
            }, 5000)


            return m(Body, [
                m('img', {
                    className: 'absolute top-0 left-0 object-cover w-full h-full',
                    src: 'images/loading.png',
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