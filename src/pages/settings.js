const m = require('mithril');

import Page from '../classes/Page.js';
import Body from "../components/Body.js";
import Button from "../components/common/Button.js";
import scenarioStore from "../stores/ScenarioStore.js";


export const page = new Page('/settings', (initialVnode) => {
    const {loadScenarioManifestRegistry, deleteOneScenarioManifest} = scenarioStore;
    loadScenarioManifestRegistry().then(() => m.redraw());

    const handleUpload = () => {
        m.route.set('/upload')
    }

    const handleDelete = (manifest) => {
        deleteOneScenarioManifest(manifest);
    }


    return {
        view: (vNode) => {
            const {manifestRegistryList} = scenarioStore;


            return m(Body, [
                m(Button, {onclick: () => {handleUpload()}}, 'Upload'),
                manifestRegistryList.map(manifest => (
                    m('div', {className: 'w-full mb-2 p-6 bg-foreground rounded-lg border border-foreground-200 shadow-md'}, [
                        m('h6', {className: 'mb-2 text-2xl font-bold tracking-tight text-font-900'}, manifest.Name ?? manifest.UUID),
                        m(Button, {onclick: () => {handleDelete(manifest)}}, 'Delete')
                    ])
                ))
            ])
        }
    }
});