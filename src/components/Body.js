const m = require("mithril");

import Sidebar from "./common/Sidebar.js";


const Body = (initialVnode) => {


    return {
        view: (vNode) => {


            return m('div', {className: 'flex gap-0'}, [
                m('div', m(Sidebar)),
                m('div', {className: 'grow p-4'}, vNode.children)
            ])
        }
    }
}

export default Body;