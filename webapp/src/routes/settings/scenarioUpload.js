const m = require('mithril');

import Page from '../../models/Page.model.js';
import Body from "../../components/Body.component.js";
import Button from "../../components/Button.component.js";
import TitleBar from "../../components/TitleBar.component.js";
import manifestStore from "../../stores/Manifest.store.js";


export default new Page('/settings/scenarios/upload', (initialVnode) => {
    const {addOneScenarioManifest, getContentsFromScenarioManifestFile} = manifestStore;


    let file = undefined;


    const handleFileOnChange = (e) => {
        file = e.target.files[0];
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let tmpScenarioManifest = await getContentsFromScenarioManifestFile(file);
        if (!!tmpScenarioManifest)
            addOneScenarioManifest(tmpScenarioManifest);

        m.route.set('/settings/scenarios');
    };


    return {
        view: (vNode) => {


            return m(Body, [
                m('img', {
                    className: 'absolute top-0 left-0 object-cover w-full h-full -z-10',
                    src: 'images/background.png',
                    role: 'presentation'
                }),
                m(TitleBar, 'Upload'),
                m('form', {className: 'flex px-[5%]', onsubmit: (e) => handleSubmit(e)}, [
                    m('input', {className: 'flex-1', type: 'file', onchange: handleFileOnChange}),
                    m('div', {className: 'flex-none'}, m(Button, {button: 'submit'}, 'Upload'))
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