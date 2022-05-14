import Scenario from "../classes/Scenario.js";

export let scenarioManager;

export default class ScenarioManager {
    constructor() {
        if (!scenarioManager) {
            this.scenarios = [];
            return this;
        }
        else
            return scenarioManager;
    }

    append(fileRegistryItem) {
        if (fileRegistryItem instanceof fileRegistryItem)
            this.scenarios.push(fileRegistryItem);
    }
}

scenarioManager = new ScenarioManager();
export let {scenarios} = scenarioManager;