const m = require("mithril");

const MainMenuButtonOverlay = (initialVnode) => {

    return {
        view: (vNode) => {
            const {attrs} = vNode;

            return (
                m('div.mainMenuButtonOverlay',
                    m('button.mainMenuButtonOverlay_button', {onclick: attrs.onclick}, [
                        m('div.mainMenuButtonOverlay_button_bar'),
                        m('div.mainMenuButtonOverlay_button_bar'),
                        m('div.mainMenuButtonOverlay_button_bar')
                    ])
                )
            )
        }
    }
}

export default MainMenuButtonOverlay;