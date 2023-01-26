export default class Runner {
    constructor(scenarioDefinition) {
        this.scenarioDefinition = scenarioDefinition;
        this.func = undefined
        this.params = {};
    };

    compile(func, rawRunner) {
        this.func = undefined;
        if (!!func)
            this.func = func;

        this.params = {};
        for (let key in rawRunner.params) {
            const rawParam = rawRunner.params[key];
            if (key === "faction") {
                const faction = this.scenarioDefinition.factions[rawParam];
                this.params[rawParam] = faction;
            }
            else if (key === "factions") {
                this.params[rawParam] = [];
                for (let key in this.scenarioDefinition.factions) {
                    const faction = this.scenarioDefinition.factions[key];
                    this.params[rawParam].push(faction);
                }
            }
            else if (key === "tile") {
                const [row, column] = key.split(',');
                const tile = this.scenarioDefinition.tiles[row][column];
                this.params[rawParam] = tile;
            }
            else if (key === "tiles") {
                this.params[rawParam] = [];
                for (let key in this.scenarioDefinition.factions) {
                    const [row, column] = key.split(',');
                    const tile = this.scenarioDefinition.tiles[row][column];
                    this.params[rawParam].push(tile);
                }
            }
        }
    }

    run() {
        if (!!this.func)
            return this.func(this.params);
    }
}