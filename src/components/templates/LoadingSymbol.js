const m = require("mithril");


const Body = (initialVnode) => {


    return {
        view: (vNode) => {
            const {attrs, children} = vNode;


            return m('img', {src: 'src/images/loading_symbol.png', alt: 'Three hexes', className: 'w-4 h-4', ...attrs})
        }
    }
}

export default Body;