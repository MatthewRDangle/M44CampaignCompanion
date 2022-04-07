import Scenario from "./lib/classes/Scenario.js";

export let activeScenario = undefined;
export const setActiveScenario = (scenario) => {
    if (scenario instanceof Scenario)
        activeScenario = scenario;
}