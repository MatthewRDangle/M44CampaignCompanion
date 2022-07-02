const path = require('path');

import {appDir} from '../utilities/readdir.js';


export const scenarioService = {
    getAll: () => {
        const json = localStorage.getItem('scenarioFiles');
        if (json)
            return JSON.parse(json);
        else
            return [];
    },

    set: (files) => {
        localStorage.setItem('scenarioFiles', JSON.stringify(files));
    },

    add: (file) => {
        let scenarioFiles = this.getAll();
        scenarioFiles.push(file);
        this.set(scenarioFiles);
        return scenarioFiles;
    },

    loadFile: (file) => {
        return new Promise(async resolve => {
            const response = await fetch(path.join(appDir, file.path));
            const json = await response.text();
            resolve(JSON.parse(json));
        })
    }
}