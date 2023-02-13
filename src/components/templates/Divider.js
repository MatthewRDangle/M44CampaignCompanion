const m = require("mithril");
const classNames = require("classnames");


const Divider = (initialVnode) => {


    return {
        view: (vNode) => {
            const {attrs} = vNode;

            return (
                !!attrs.fancy
                    ? m('div')
                    : m('hr')
            )
        }
    }
}

export default Divider;