const m = require('mithril');

import Page from '../classes/Page.js';
import Body from "../components/Body.js";
import Button from "../components/common/Button.js";
import scenarioStore from "../stores/ScenarioStore.js";


export const page = new Page('/upload', (initialVnode) => {
    const {addOneScenarioManifest} = scenarioStore;


    let file = undefined;


    const handleFileOnChange = (e) => {
        file = e.target.value;
        console.log(file);
    };

    const handleUpload = (e) => {
        addOneScenarioManifest(file);
    };


    return {
        view: (vNode) => {


            return m(Body, [
                m('form', [
                    m('label', 'Select Manifest File'),
                    m('input', {type: 'file', onchange: handleFileOnChange}),
                    m(Button, {type: 'button', onclick: handleUpload}, 'Upload')
                ])
            ])
        }
    }
});