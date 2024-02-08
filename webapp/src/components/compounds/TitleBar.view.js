import m from 'mithril';

const TitleBar = (initialVnode) => {


    return {
        view: (vNode) => {
            const {children} = vNode;

            return m('div', {className: 'text-4xl mt-2 align-center'}, [
                m('div', {className: 'inline-block h-1 w-1/3 bg-secondary-500', role: 'presentation'}),
                m('h1', {className: 'inline-block w-1/3 text-center'}, ...children),
                m('div', {className: 'inline-block h-1 w-1/3 bg-secondary-500', role: 'presentation'}),
            ])
        }
    }
}

export default TitleBar;