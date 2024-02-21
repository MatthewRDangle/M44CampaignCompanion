import m from 'mithril'; 
import classnames from "classnames";
import Divider from "../../primitives/Divider.view.js";
import LoadingSymbol from "../../compounds/LoadingSymbol.view.js";


const Nav = (initialVnode) => {


    return {
        oninit: (vNode) => {
            // vNode.attrs.list = []
        },
        view: (vNode) => {
            const { attrs } = vNode;
            const { list } = attrs

            const navItemClassName = "flex p-0 mt-5 mb-5 font-normal text-font text-xl bg-transparent border-transparent";


            return m('nav', [
                list.map((item, idx, arr) => ([
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