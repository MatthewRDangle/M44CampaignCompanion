const m = require("mithril");


const NavTitle = (initialVnode) => {


    return {
        view: (vNode) => {
            const {attrs, children} = vNode;

            return m('h1', {className: 'text-5xl mb-[12vh]'}, children)
        }
    }
}

export default NavTitle;