const m = require("mithril");

import TitleBar from "../TitleBar.js";
import Divider from "../Divider.js";
import ScenarioDefinitionStore from "../../stores/definition.store.js";


const PauseMenuHud = (initialVnode) => {

    const handleBackToMainMenu = (e) => {
        m.route.set('/mainMenu');
    }


    return {
        view: (vNode) => {
            const {onResume} = vNode.attrs;
            const {activeScenarioDefinition} = ScenarioDefinitionStore;


            return ([
                m('div', {className: 'w-screen h-screen bg-background opacity-50 fixed top-0 left-0 z-10'}),
                m('div', {className: 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] bg-background border-[1px] border-solid border-secondary z-10 rounded-lg shadow-lg shadow-background-500/50'}, [
                    m('div', {className: 'text-4xl mt-4 align-center'}, [
                        m('div', {className: 'inline-block h-1 w-1/3 bg-secondary-500', role: 'presentation'}),
                        m('h1', {className: 'inline-block w-1/3 text-center'}, 'Pause'),
                        m('div', {className: 'inline-block h-1 w-1/3 bg-secondary-500', role: 'presentation'}),
                    ]),
                    m('div', {className: 'p-6'}, [
                        m('div', {
                            className: 'w-full text-center pt-4 pb-4 mt-2 mb-2 cursor-pointer hover:bg-selected',
                            onclick: onResume
                        }, 'Resume'),
                        m('div', {className: 'w-1/4 m-auto'},
                            m(Divider, {fancy: true})
                        ),
                        m('div', {
                            className: 'w-full text-center pt-4 pb-4 mt-2 mb-2 opacity-50 cursor-not-allowed'
                        }, 'Save Game'),
                        m('div', {className: 'w-1/4 m-auto'}, m(Divider, {fancy: true})),
                        m('div', {
                            className: 'w-full text-center pt-4 pb-4 mt-2 mb-2 cursor-pointer hover:bg-selected',
                            onclick: handleBackToMainMenu
                        }, 'Back to Main Menu'),
                    ])
                ])
            ])
        }
    }
}

export default PauseMenuHud;