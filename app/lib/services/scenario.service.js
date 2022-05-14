const path = require('path');

export const scenarioService = {
    getAll: () => {
        return new Promise(async resolve => {
            const json = await import(path.join(__dirname, '../', 'registries', 'scenario.registry.json'));
            resolve(JSON.parse(json));
        })
    }
}