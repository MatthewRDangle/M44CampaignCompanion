import ScenarioDefinition from "../classes/ScenarioDefinition.js";
import {scenarioDefinitionService} from "../services/scenarioDefinition.service.js";


let scenarioDefinitionStore;

class ScenarioDefinitionStore {

    constructor() {
        if (!scenarioDefinitionStore) {
            this.setActiveDefinition = this.setActiveDefinition.bind(this);
            this.loadScenarioDefinition = this.loadScenarioDefinition.bind(this);
            return this;
        } else
            return scenarioDefinitionStore;
    }

    definitionRegistry = {};
    activeDefinition = undefined;


    setActiveDefinition(id) {
        (async () => {
            await this.loadScenarioDefinition(this.definitionRegistry[id]);
            this.activeDefinition = new ScenarioDefinition(this.definitionRegistry[id]);
        })()
    }


    async loadScenarioDefinition(registryItem) {
        let tmpDefinition;
        try {
            tmpDefinition = await scenarioDefinitionService.getFileContent(registryItem.path);
            console.log(tmpDefinition);
        } catch(e) {throw Error(e)}
        finally {
            if (!!tmpDefinition)
                this.definitionRegistry[registryItem.id] = tmpDefinition;
        }
        return tmpDefinition;
    }
}

scenarioDefinitionStore = new ScenarioDefinitionStore();
export default scenarioDefinitionStore;