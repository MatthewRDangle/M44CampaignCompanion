import m from 'mithril';
import Button from "../../Button.view.js";


const GameOverHud = (initialVnode) => {

    const handleBackToMainMenu = (e) => {
        m.route.set('/mainMenu');
    }


    return {
        view: (vNode) => {
            const {attrs} = vNode;
            const faction = attrs.currentTurn;


            return ([
                m('div', {className: 'w-screen h-screen p-2 bg-background fixed top-0 left-0 z-10 select-none'}, [
                    m('span', faction.gameOverMessage),
                    m(Button, {onclick: handleBackToMainMenu}, 'Back to Main Menu')
                ]),
            ])
        }
    }
}

export default GameOverHud;