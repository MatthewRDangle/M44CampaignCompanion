const m = require("mithril");


const Body = (initialVnode) => {


    return {
        view: (vNode) => {


            return m('img', {
                className: 'absolute top-0 left-0 object-cover w-full h-full -z-10',
                src: 'images/background.png',
                role: 'presentation'
            })
        }
    }
}

export default Body;