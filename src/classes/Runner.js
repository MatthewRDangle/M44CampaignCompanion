export default class Runner {
    constructor(scenarioDefinition) {
        this.scenarioDefinition = scenarioDefinition;
        this.func = undefined
        this.params = {};
    };

    compile(func, params) {
        try {
            this.func = undefined;
            if (!!func)
                this.func = func;

            this.params = {};
            for (let key in params) {
                const rawParam = params[key];
                if (key === "faction") {
                    const faction = this.scenarioDefinition.factions[rawParam];
                    this.params[key] = faction;
                }
                else if (key === "factions") {
                    this.params[key] = [];
                    for (let name of params.factions) {
                        const faction = this.scenarioDefinition.factions[name];
                        this.params[key].push(faction);
                    }
                }
                else if (key === "tile") {
                    const [row, column] = key.split(',');
                    const tile = this.scenarioDefinition.tiles[row][column];
                    this.params[key] = tile;
                }
                else if (key === "tiles") {
                    this.params[key] = [];
                    for (let id of params.tiles) {
                        const [row] = id.split('-');
                        const tile = this.scenarioDefinition.tiles[row][id];
                        this.params[key].push(tile);
                    }
                }
            }
        } catch(err) { console.error(err) }
    }

    run() {
        if (!!this.func)
            return this.func(this.params);
    }
}