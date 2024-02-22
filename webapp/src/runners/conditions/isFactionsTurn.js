import Faction from "../../models/scenario/Faction.model.js";
import definitionStore from "../../stores/Definition.store.js";


export default ({faction}) => {
    const { activeScenarioDefinition } = definitionStore;
    return faction instanceof Faction && faction.name === activeScenarioDefinition.currentTurn;
}