const m = require('mithril');
const classNames = require('classnames');

import Page from '../../models/Page.js';
import Button from "../../components/Button.js";
import Body from "../../components/Body.js";
import TitleBar from "../../components/TitleBar.js";
import manifestStore from "../../stores/manifest.store.js";
import definitionStore from "../../stores/definition.store.js";
import boardStore from "../../stores/board.store.js";


export const page = new Page('/session/lobby', (initialVnode) => {
    const {loadScenarioManifestRegistry} = manifestStore;
    const {setActiveScenarioDefinition} = definitionStore;
    loadScenarioManifestRegistry().then(() => m.redraw());


    let selectedScenario = undefined;

    const handleSelectScenario = (manifest) => {
        selectedScenario = manifest;
    }

    const handleStartBattle = async (manifest) => {
        if (selectedScenario) {
            await setActiveScenarioDefinition(manifest);
            boardStore.resetBoard()
            m.route.set('/scenario');
        }
    }


    return {
        view: (vNode) => {
            const {manifestRegistryList} = manifestStore;

            return m(Body, [
                m('img', {
                    className: 'absolute top-0 left-0 object-cover w-full h-full -z-10',
                    src: 'images/background.png',
                    role: 'presentation'
                }),
                m(TitleBar, 'Skirmish'),
                m('div', {className: 'text-center my-4'}, [
                    m('div', {className: 'relative inline-block w-[377px] h-[206px] mx-auto bg-background border-2 border-solid border-secondary-500 rounded-md'},
                        m('span', {className: 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'}, 'No Preview'))
                ]),
                m('table', {className: 'w-full px-[10%] border-spacing-y-2 border-separate'}, [
                    m('tr', {className: 'text-left'}, [
                        m('th', {className: 'border-b-2 border-solid border-secondary-500'}, 'Scenario'),
                        m('th', {className: 'border-b-2 border-solid border-secondary-500'},'Factions'),
                        m('th', {className: 'border-b-2 border-solid border-secondary-500'},'Size')
                    ]),
                    manifestRegistryList.map(manifest => (
                      m('tr', {
                          className: classNames('cursor-pointer hover:bg-selected', {
                              'bg-selected': selectedScenario?.UUID === manifest.UUID
                          }),
                          onclick: () => {handleSelectScenario(manifest)}
                      }, [
                          m('td', manifest.name),
                          m('td', manifest.factions),
                          m('td', `${manifest.size?.rows} x ${manifest.size?.columns}`),
                      ])
                    ))
                ]),
                m('div', {className: 'absolute left-[5%] bottom-[5%]'},
                    m(Button, {
                        onclick: () => m.route.set('mainmenu')
                    }, 'Back')
                ),
                m('div', {className: 'absolute right-[5%] bottom-[5%]'},
                    m(Button, {
                        onclick: () => {handleStartBattle(selectedScenario)},
                        disabled: !selectedScenario
                    }, 'Start')
                )
            ])
        }
    }
})