const m = require("mithril");


const TitleBar = (initialVnode) => {


    return {
        view: (vNode) => {
            const {attrs, children} = vNode;

            return m('h1', {className: 'text-4xl mt-2 align-center'}, [
                m('div', {className: 'inline-block h-1 w-1/3 bg-secondary-500', role: 'presentation'}),
                m('span', {className: 'inline-block w-1/3 text-center'}, ...children),
                m('div', {className: 'inline-block h-1 w-1/3 bg-secondary-500', role: 'presentation'}),
            ])
        }
    }
}

export default TitleBar;