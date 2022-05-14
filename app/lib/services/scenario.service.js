const path = require('path');

export const scenarioService = {
    getAll: () => {
        return new Promise(async resolve => {
            const response = await fetch(path.join(__dirname, '../', 'registries', 'scenario.registry.json'));
            const json = await response.text();
            resolve(JSON.parse(json));
        })
    }
}