import m from 'mithril';


const Divider = (initialVnode) => {


    return {
        view: (vNode) => {
            const { attrs } = vNode;
            const { fancy } = attrs;

            return (
                !!fancy
                    ? m('div', {className: 'flex h-0.5 w-full rounded-md'}, [
                        m('div', {className: 'h-full w-1/2 bg-secondary-900'}),
                        m('div', {className: 'h-full w-1/2 bg-secondary-500'})
                    ])
                    : m('hr')
            )
        }
    }
}

export default Divider;