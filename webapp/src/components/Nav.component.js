const m = require("mithril");
const classnames = require("classnames");

import routeStore from "../stores/Route.store.js";
import Divider from "./Divider.component.js";
import LoadingSymbol from "./LoadingSymbol.component.js";


const Nav = (initialVnode) => {


    return {
        view: (vNode) => {
            const {currentRoute, navRoutes} = routeStore;

            const navItemClassName = "flex p-0 mt-5 mb-5 font-normal text-font text-xl bg-transparent border-transparent";

            return m('nav', [
                navRoutes.map((item, idx, arr) => ([
                    m('div', {className: 'relative group'}, [
                        !item.disabled && m(LoadingSymbol, {
                            className: 'hidden absolute top-2 -left-6 group-hover:inline-block',
                        }),
                        !!item.path
                            ? m(m.route.Link, {
                                href: item.path,
                                className: classnames(navItemClassName, {
                                    'cursor-pointer': !item.disabled,
                                    'opacity-20 cursor-not-allowed': !!item.disabled
                                }),
                            }, item.label)
                            : m('button', {
                                onclick: item.onclick,
                                className: classnames(navItemClassName, {
                                    'cursor-pointer': !item.disabled,
                                    'opacity-20 cursor-not-allowed': !!item.disabled
                                }),
                                disabled: !!item.disabled
                            }, item.label)
                    ]),
                    idx !== arr.length - 1 && m(Divider)
                ])),
            ])
        }
    }
}

export default Nav;