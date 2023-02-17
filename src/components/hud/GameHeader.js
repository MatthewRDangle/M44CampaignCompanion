const m = require("mithril");
const classNames = require('classnames');

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
            const color = activeScenarioDefinition.currentTurn.color;


            return ([
                __optionsOpened ? m(PauseMenu, {onResume: handleOptionsOverlay}) : '',
                m('div', {className: 'absolute top-0 left-0 flex justify-between w-full pt-2 pb-2 pl-5 pr-5 bg-background border-b-[1px] border-solid border-secondary-500 shadow-lg shadow-background-500/50'}, [
                    m('div', {className: 'relative'}, [
                        m('div', {
                            className: 'absolute w-16 h-24 mr-2',
                            style: {
                                color: color?.text,
                                'background-color': color?.background,
                                border: `1px solid ${color?.text}`,
                                'border-top': '0',
                                'border-radius': '0.25rem 0.25rem 0 0',
                                'clip-path': 'polygon(0% 0%, 0% 100%, 50% 75%, 100% 100%, 100% 0%)'
                            }
                        }),
                        m('span', {className: 'inline-block ml-20 mt-1'}, activeScenarioDefinition.currentTurn.name)
                    ]),
                    m('button', {onclick: handleOptionsOverlay}, [
                        m('div', {className: 'w-6 h-1 bg-interaction mt-1 mb-1 rounded-full'}),
                        m('div', {className: 'w-6 h-1 bg-interaction mt-1 mb-1 rounded-full'}),
                        m('div', {className: 'w-6 h-1 bg-interaction mt-1 mb-1 rounded-full'}),
                    ]),
                ])
            ])
        }
    }
}

export default GameHeader;