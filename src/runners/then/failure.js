import scenarioDefinitionStore from "../../stores/ScenarioDefinition.store.js";

export default ({factions}) => {
    const { activeScenarioDefinition } = scenarioDefinitionStore;

    if (!!factions && Array.isArray(factions)) {
        try {
            activeScenarioDefinition.factionsAreDefeated(factions);
        } catch(err) { console.error(err) }
    }
}