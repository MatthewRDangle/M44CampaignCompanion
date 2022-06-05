const m = require("mithril");

import Button from "../../common/Button.js";


const OptionHud = (initialVnode) => {

    let __optionsOpened = false;

    const handleOptionsOverlay = (e) => {
        __optionsOpened = !__optionsOpened;
    }

    const handleBackToMainMenu = (e) => {
        m.route.set('/mainMenu');
    }


    return {
        view: (vNode) => {
            const {attrs} = vNode;


            return ([
                __optionsOpened ? m('div', {className: 'w-screen h-screen p-2 bg-background fixed top-0 left-0 z-10'}, [
                    m(Button, {onclick: handleOptionsOverlay}, 'Resume'),
                    m(Button, {onclick: handleBackToMainMenu}, 'Back to Main Menu')
                ]) : '',
                m('div', {className: 'absolute top-4 right-4 z-1'},
                    m('button', {className: 'bg-background rounded-full border-border w-11 h-11', onclick: handleOptionsOverlay}, [
                        m('div', {className: 'w-6 h-1 bg-font m-auto mt-1 mb-1'}),
                        m('div', {className: 'w-6 h-1 bg-font m-auto mt-1 mb-1'}),
                        m('div', {className: 'w-6 h-1 bg-font m-auto mt-1 mb-1'}),
                    ])
                )
            ])
        }
    }
}

export default OptionHud;