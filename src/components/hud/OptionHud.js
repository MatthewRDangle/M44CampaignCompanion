const m = require("mithril");

import Button from "../common/Button.js";


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
                __optionsOpened ? m('div.optionOverlay', [
                    m(Button, {onclick: handleOptionsOverlay}, 'Resume'),
                    m(Button, {onclick: handleBackToMainMenu}, 'Back to Main Menu')
                ]) : '',
                m('div.optionHud',
                    m('button.optionHud_button', {onclick: handleOptionsOverlay}, [
                        m('div.optionHud_button_bar'),
                        m('div.optionHud_button_bar'),
                        m('div.optionHud_button_bar')
                    ])
                )
            ])
        }
    }
}

export default OptionHud;