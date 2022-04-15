const m = require("mithril");

const MainMenu = (initialVnode) => {

    return {
        view: (vNode) => {
            const {attrs} = vNode;
            const currentPage = attrs.currentPage || {};

            return (
                m('div.mainMenu', [
                    m('div.mainMenu_header', [
                        m('div.mainMenu_header_icon', m('img', {src: 'lib/images/logo.svg', alt: "A plane flying upward that's being targeted."})),
                        m('h1.mainMenu_header_label', attrs.title || 'Page Title')
                    ]),
                    m('nav.mainMenu_nav', vNode.children.map((child_vNode) => {
                        child_vNode.tag = 'div';
                        child_vNode.attrs.className = 'mainMenu_nav_link';
                        return child_vNode;
                    }))
                ])
            )
        }
    }
}

export default MainMenu;