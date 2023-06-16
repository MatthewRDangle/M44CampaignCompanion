const {ipcRenderer} = require('electron');


export const scenarioManifestService = {
    getAll: () => {
        const json = localStorage.getItem('scenarioManifestFiles');
        if (json)
            return JSON.parse(json);
        else
            return {};
    },

    getFileContent: async (path) => {
        return await ipcRenderer.invoke("/system/getFileContent", path)
    },

    set: (manifests) => {
        localStorage.setItem('scenarioManifestFiles', JSON.stringify(manifests));
    },

    add: (manifest) => {
        const json = localStorage.getItem('scenarioManifestFiles');
        let scenarioFiles = {};

        if (json)
            scenarioFiles = JSON.parse(json);

        scenarioFiles[manifest.UUID] = manifest;
        localStorage.setItem('scenarioManifestFiles', JSON.stringify(scenarioFiles));
        return scenarioFiles;
    },

    delete: (manifest) => {
        const json = localStorage.getItem('scenarioManifestFiles');
        try {
            const allScenarioManifestFiles = JSON.parse(json);
            delete allScenarioManifestFiles[manifest.UUID];
            localStorage.setItem('scenarioManifestFiles', JSON.stringify(allScenarioManifestFiles));
            return allScenarioManifestFiles;
        } catch(err) {
            console.error(err);
        }
    }
}