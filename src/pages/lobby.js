const m = require('mithril');

import Page from '../classes/Page.js';
import scenarioStore from "../stores/ScenarioStore.js";


export const page = new Page('/lobby', (initialVnode) => {
    const {loadScenarioFileRegistry, setActiveScenario} = scenarioStore;
    loadScenarioFileRegistry().then(() => m.redraw());

    const handleOnClick = (registryItem) => {
        setActiveScenario(registryItem.id)
        m.route.set('/scenario');
    }


    return {
        view: (vNode) => {
            const {fileRegistryList} = scenarioStore;

            return fileRegistryList.map(registryItem => (
                m('div', {className: 'p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700'}, [
                    m('h6', {className: 'mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'}, registryItem.displayName),
                    m('div', {className: 'inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
                        onclick: () => {handleOnClick(registryItem)}}, 'Play >>')
                ])
            ))
        }
    }
});