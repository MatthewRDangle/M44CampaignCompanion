const m = require('mithril');

import Page from '../../classes/Page.js';
import Body from "../../components/Body.js";
import Button from "../../components/common/Button.js";
import scenarioManifestStore from "../../stores/ScenarioManifest.store.js";


export const page = new Page('/settings/upload', (initialVnode) => {
    const {addOneScenarioManifest, getContentsFromScenarioManifestFile} = scenarioManifestStore;


    let file = undefined;


    const handleFileOnChange = (e) => {
        file = e.target.files[0];
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let tmpScenarioManifest = await getContentsFromScenarioManifestFile(file);
        if (!!tmpScenarioManifest)
            addOneScenarioManifest(tmpScenarioManifest);

        m.route.set('settings');
    };


    return {
        view: (vNode) => {


            return m(Body, [
                m('form', {onsubmit: (e) => handleSubmit(e)}, [
                    m('label', 'Select Manifest File'),
                    m('input', {type: 'file', onchange: handleFileOnChange}),
                    m(Button, {button: 'submit'}, 'Upload')
                ])
            ])
        }
    }
});