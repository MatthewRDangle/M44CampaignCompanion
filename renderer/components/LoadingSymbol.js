const m = require("mithril");


const LoadingSymbol = (initialVnode) => {


    return {
        view: (vNode) => {
            const {attrs, children} = vNode;


            return m('img', {src: 'images/loading_symbol.png', alt: 'Three hexes', className: 'w-4 h-4', ...attrs})
        }
    }
}

export default LoadingSymbol;