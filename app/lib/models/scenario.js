import ScenarioConfig from "./ScenarioConfig.js";

export class Scenario {
    constructor(scenarioConfig) {
        if (!scenarioConfig || !(scenarioConfig instanceof ScenarioConfig))
            scenarioConfig = new ScenarioConfig();
        this.scenarioConfig = scenarioConfig;

        this.devMode = false;
        this.columns = 0;
        this.rows = 0;

        this.factions = [];
        this.tiles = {};
    }

    generate(scene, map) {
        const scenarioConfig = this.scenarioConfig;
        this.tiles = scenarioConfig.constructTiles(scene, map);
    }
}