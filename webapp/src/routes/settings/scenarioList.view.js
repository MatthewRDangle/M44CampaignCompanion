import Page from '../../models/Page.model.js';
import m from 'mithril';
import Body from "../../components/layouts/Body.view.js";
import Button from "../../components/primitives/Button.view.js";
import TitleBar from "../../components/compounds/TitleBar.view.js";
import manifestStore from "../../stores/Manifest.store.js";


export default new Page('/settings/scenarios', (initialVnode) => {
    const {loadScenarioManifestRegistry, deleteOneScenarioManifest} = manifestStore;
    loadScenarioManifestRegistry().then(() => m.redraw());

    const handleUpload = () => {
        m.route.set('/settings/scenarios/upload')
    }

    const handleDelete = (manifest) => {
        deleteOneScenarioManifest(manifest);
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
                m(TitleBar, 'Scenarios'),
                m('div', {className: 'w-full px-[10%] my-4 text-center'},
                    m(Button, {onclick: () => {handleUpload()}}, 'Upload'),
                ),
                m('table', {className: 'w-full px-[10%] border-spacing-y-2 border-separate'}, [
                    m('tr', {className: 'text-left'}, [
                        m('th', {className: 'border-b-2 border-solid border-secondary-500'}, 'Scenario'),
                        m('th', {className: 'border-b-2 border-solid border-secondary-500'}, 'Factions'),
                        m('th', {className: 'border-b-2 border-solid border-secondary-500'}, 'Size'),
                        m('th', {className: 'border-b-2 border-solid border-secondary-500'})
                    ]),
                    manifestRegistryList.map(manifest => (
                        m('tr', [
                            m('td', manifest.name),
                            m('td', manifest.factions),
                            m('td', `${manifest.size?.rows} x ${manifest.size?.columns}`),
                            m('td', m(Button, {onclick: () => {handleDelete(manifest)}}, 'Delete'))
                        ])
                    ))
                ]),
                m('div', {className: 'absolute left-[5%] bottom-[5%]'},
                    m(Button, {
                        onclick: () => m.route.set('mainmenu')
                    }, 'Back')
                ),
            ])
        }
    }
});