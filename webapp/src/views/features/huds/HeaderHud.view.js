import m from 'mithril';
import PauseMenuHud from "./PauseMenuHud.view.js";
import ScenarioDefinitionStore from "../../../stores/Definition.store.js";


const HeaderHud = (initialVnode) => {

    let __optionsOpened = false;


    const handleOptionsOverlay = (e) => {
        __optionsOpened = !__optionsOpened;
    }


    return {
        view: (vNode) => {
            const {activeScenarioDefinition} = ScenarioDefinitionStore;
            const {color, flag} = activeScenarioDefinition.currentTurn;


            return ([
                __optionsOpened ? m(PauseMenuHud, {onResume: handleOptionsOverlay}) : '',
                m('div', {className: 'absolute top-0 left-0 flex justify-between w-full pt-2 pb-2 pl-5 pr-5 bg-background border-b-[1px] border-solid border-secondary-500 shadow-lg shadow-background-500/50 select-none'}, [
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
                        },
                            !!flag.src && m('img', {
                                className: 'w-full h-full object-cover',
                                style: 'border-radius: inherit;',
                                src: flag.src,
                                alt: flag.alt
                            })
                        ),
                        m('span', {className: 'inline-block ml-20 mt-1'}, activeScenarioDefinition.currentTurn.name)
                    ]),
                    m('span', `Turn ${activeScenarioDefinition.turnCounter}`),
                    m('button', {onclick: handleOptionsOverlay}, [
                        m('div', {className: 'w-6 h-1 bg-secondary-700 mt-1 mb-1 rounded-full'}),
                        m('div', {className: 'w-6 h-1 bg-secondary-700 mt-1 mb-1 rounded-full'}),
                        m('div', {className: 'w-6 h-1 bg-secondary-700 mt-1 mb-1 rounded-full'}),
                    ]),
                ])
            ])
        }
    }
}

export default HeaderHud;