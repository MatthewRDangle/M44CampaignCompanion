const m = require("mithril");

import LoadingSymbol from "./LoadingSymbol.component.js";


const Quotes = (initialVnode) => {

    const quote = {
        message: '“Success in not final, failure is not fatal. It is the courage to continue that counts.”',
        author: 'Winston Churchill'
    };


    return {
        view: (vNode) => {
            const {attrs} = vNode;


            return m('div', attrs, [
                m('span', quote.message),
                m('br'),
                m('br'),
                m('span', quote.author)
            ])
        }
    }
}

export default Quotes;