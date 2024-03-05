import definitionStore from "../../stores/Definition.store.js";


export default ({number}) => {
    const { activeScenarioDefinition } = definitionStore;
    return number === activeScenarioDefinition.turnCounter;
}