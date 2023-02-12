const m = require('mithril');

import Page from '../classes/Page.js';
import Button from "../components/common/Button.js";
import Body from "../components/Body.js";
import scenarioManifestStore from "../stores/ScenarioManifest.store.js";
import scenarioDefinitionStore from "../stores/ScenarioDefinition.store.js";


export const page = new Page('/lobby', (initialVnode) => {
    const {loadScenarioManifestRegistry} = scenarioManifestStore;
    const {setActiveScenarioDefinition} = scenarioDefinitionStore;
    loadScenarioManifestRegistry().then(() => m.redraw());


    const handleOnClick = async (manifest) => {
        await setActiveScenarioDefinition(manifest);
        m.route.set('/session');
    }


    return {
        view: (vNode) => {
            const {manifestRegistryList} = scenarioManifestStore;

            return m(Body, [
                m('h1', {className: 'mb-2 text-2xl'}, 'Scenarios'),
                manifestRegistryList.map(manifest => (
                    m('div', {className: 'w-full mb-2 p-6 bg-foreground rounded-lg border border-foreground-200 shadow-md'}, [
                        m('h6', {className: 'mb-2 text-2xl font-bold tracking-tight text-font-900'}, manifest.name ?? manifest.UUID),
                        m(Button, {onclick: () => {handleOnClick(manifest)}}, 'Play >>')
                    ])
                ))
            ])
        }
    }
});