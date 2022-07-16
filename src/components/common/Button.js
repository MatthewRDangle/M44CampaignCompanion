const m = require("mithril");
const classNames = require("classnames");


const Button = (initialVnode) => {


    return {
        view: (vNode) => {
            const {attrs} = vNode;

            return (
                m('button', {
                    className: classNames('pl-2 pr-2 pt-1 pb-1 text-foreground bg-primary rounded hover:bg-transparent hover:text-primary disabled:opacity-50'),
                    type: attrs.button ?? 'button',
                    onclick: attrs.onclick ?? undefined,
                    disabled: attrs.disabled ?? false
                }, vNode.children)
            )
        }
    }
}

export default Button;