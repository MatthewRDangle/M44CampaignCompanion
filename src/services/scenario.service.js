const path = require('path');

import {appDir} from '../utilities/readdir.js';


export const scenarioService = {
    getRegistry: () => {
        return new Promise(async resolve => {
            const response = await fetch(path.join(appDir, 'registries', 'scenario.registry.json'));
            const json = await response.text();
            resolve(JSON.parse(json));
        })
    },

    getDefinition: (registryItem) => {
        return new Promise(async resolve => {
            const response = await fetch(path.join(appDir, registryItem.path));
            const json = await response.text();
            resolve(JSON.parse(json));
        })
    }
}