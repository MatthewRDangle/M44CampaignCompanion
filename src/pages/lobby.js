const m = require('mithril');

import Page from '../classes/Page.js';
import Button from "../components/common/Button.js";
import scenarioStore from "../stores/ScenarioStore.js";
import Body from "../components/Body.js";


export const page = new Page('/lobby', (initialVnode) => {
    const {loadScenarioFileRegistry, setActiveScenario} = scenarioStore;
    loadScenarioFileRegistry().then(() => m.redraw());

    const handleOnClick = (registryItem) => {
        setActiveScenario(registryItem.id)
        m.route.set('/scenario');
    }


    return {
        oninit: async () => {
            const {setTestData} = scenarioStore;
            await setTestData();
        },

        view: (vNode) => {
            const {fileRegistryList} = scenarioStore;

            return m(Body, [
                m('h1', {className: 'mb-2 text-2xl'}, 'Scenarios'),
                fileRegistryList.map(registryItem => (
                    m('div', {className: 'w-full mb-2 p-6 bg-foreground rounded-lg border border-foreground-200 shadow-md'}, [
                        m('h6', {className: 'mb-2 text-2xl font-bold tracking-tight text-font-900'}, registryItem.displayName),
                        m(Button, {onclick: () => {handleOnClick(registryItem)}}, 'Play >>')
                    ])
                ))
            ])
        }
    }
});