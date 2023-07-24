import ScenarioDefinitionStore from "../../stores/definition.store.js";

export default class BattleMap {
    name = undefined;
    src = undefined;
    alt = undefined;

    constructor(definition) {
        if (!definition) return

        this.name = definition.name;
        this.src = definition.src;
        this.alt = definition.alt;
    }

    get activeScenario() {
        return ScenarioDefinitionStore.activeScenarioDefinition;
    }
}