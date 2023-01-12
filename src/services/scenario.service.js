const path = require('path');

import {appDir} from '../utilities/readdir.js';


export const scenarioService = {
    getAll: () => {
        const json = localStorage.getItem('scenarioManifestFiles');
        if (json)
            return JSON.parse(json);
        else
            return [];
    },

    set: (manifests) => {
        localStorage.setItem('scenarioManifestFiles', JSON.stringify(manifests));
    },

    add: (manifest) => {
        let scenarioFiles = this.getAll();
        scenarioFiles.push(manifest);
        this.set(scenarioFiles);
        return scenarioFiles;
    },

    delete: (manifest) => {
        const json = localStorage.getItem('scenarioManifestFiles');
        try {
            const allScenarioManifestFiles = JSON.parse(json);
            delete manifest.UUID;
            localStorage.setItem('scenarioManifestFiles', JSON.stringify(allScenarioManifestFiles));
            return allScenarioManifestFiles;
        } catch(err) {
            console.error(err);
        }
    },

    loadFile: (file) => {
        return new Promise(async resolve => {
            const response = await fetch(path.join(appDir, file.path));
            const json = await response.text();
            resolve(JSON.parse(json));
        })
    }
}