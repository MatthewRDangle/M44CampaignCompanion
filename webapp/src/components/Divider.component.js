import m from 'mithril';
const classNames = require("classnames");


const Divider = (initialVnode) => {


    return {
        view: (vNode) => {
            const {attrs} = vNode;

            return (
                !!attrs.fancy
                    ? m('div', {className: 'w-full h-px bg-secondary'})
                    : m('hr')
            )
        }
    }
}

export default Divider;