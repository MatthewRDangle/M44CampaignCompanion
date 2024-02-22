import definitionStore from "../../stores/Definition.store.js";


export default ({factions}) => {
    const { activeScenarioDefinition } = definitionStore;

    if (!!factions && Array.isArray(factions)) {
        try {
            activeScenarioDefinition.factionsAreDefeated(factions);
        } catch(err) { console.error(err) }
    }
}