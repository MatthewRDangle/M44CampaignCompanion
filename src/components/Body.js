const m = require("mithril");


const Body = (initialVnode) => {


    return {
        view: (vNode) => {
            const {attrs, children} = vNode;


            return m('div', attrs, children)
        }
    }
}

export default Body;