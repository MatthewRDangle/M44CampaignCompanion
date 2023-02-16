const m = require("mithril");

import PauseMenu from "./PauseMenu.js";
import ScenarioDefinitionStore from "../../stores/ScenarioDefinition.store.js";


const GameHeader = (initialVnode) => {

    let __optionsOpened = false;


    const handleOptionsOverlay = (e) => {
        __optionsOpened = !__optionsOpened;
    }


    return {
        view: (vNode) => {
            const {activeScenarioDefinition} = ScenarioDefinitionStore;


            return ([
                __optionsOpened ? m(PauseMenu, {onResume: handleOptionsOverlay}) : '',
                m('div', {className: 'absolute top-0 left-0 flex justify-between w-full pt-2 pb-2 pl-5 pr-5 bg-background border-b-[1px] border-solid border-secondary-500 shadow-lg shadow-background-500/25'}, [
                    m('span', activeScenarioDefinition.currentTurn.name),
                    m('button', {onclick: handleOptionsOverlay}, [
                        m('div', {className: 'w-6 h-1 bg-font mt-1 mb-1'}),
                        m('div', {className: 'w-6 h-1 bg-font mt-1 mb-1'}),
                        m('div', {className: 'w-6 h-1 bg-font mt-1 mb-1'}),
                    ]),
                ])
            ])
        }
    }
}

export default GameHeader;