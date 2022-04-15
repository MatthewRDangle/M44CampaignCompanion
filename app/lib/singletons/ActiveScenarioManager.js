import Scenario from "../classes/Scenario.js";

export let activeScenarioManager;

export default class ActiveScenarioManager {
    constructor() {
        if (!activeScenarioManager) {
            this.activeScenario = undefined;
            return this;
        }
        else
            return activeScenarioManager;
    }

    set(scenario) {
        if (scenario instanceof Scenario) {
            this.activeScenario = scenario;
            activeScenario = scenario;
        }
    }
}

activeScenarioManager = new ActiveScenarioManager();
export let {activeScenario} = activeScenarioManager;