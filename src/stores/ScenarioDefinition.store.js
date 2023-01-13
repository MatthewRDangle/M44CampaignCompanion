import ScenarioDefinition from "../classes/ScenarioDefinition.js";
import {scenarioDefinitionService} from "../services/scenarioDefinition.service.js";


let scenarioDefinitionStore;

class ScenarioDefinitionStore {

    constructor() {
        if (!scenarioDefinitionStore) {
            this.setActiveScenarioDefinition = this.setActiveScenarioDefinition.bind(this);
            this.loadScenarioDefinition = this.loadScenarioDefinition.bind(this);
            this.getContentsFromScenarioDefinitionFile = this.getContentsFromScenarioDefinitionFile.bind(this);
            return this;
        } else
            return scenarioDefinitionStore;
    }

    scenarioDefinitionRegistry = {};
    activeScenarioDefinition = undefined;


    async setActiveScenarioDefinition(manifest) {
        let rawScenarioDefinition = undefined;
        if (typeof manifest.scenarioDefinition === 'string') { // Assume path to file.
            const pathToScenarioDefinition = manifest.pathToDir + manifest.scenarioDefinition;
            rawScenarioDefinition = await this.getContentsFromScenarioDefinitionFile(pathToScenarioDefinition);
        } else if (typeof manifest.scenarioDefinition === 'object') { // Assume definition is baked into file.
            rawScenarioDefinition = manifest.scenarioDefinition;
        }

        if (!!rawScenarioDefinition) {
            const scenarioDefinition = new ScenarioDefinition(rawScenarioDefinition);
            this.activeScenarioDefinition = scenarioDefinition;
        }
    }

    async loadScenarioDefinition(registryItem) {
        let tmpDefinition;
        try {
            tmpDefinition = await scenarioDefinitionService.getFileContent(registryItem.path);
        } catch(e) {throw Error(e)}
        finally {
            if (!!tmpDefinition)
                this.scenarioDefinitionRegistry[registryItem.id] = tmpDefinition;
        }
        return tmpDefinition;
    }

    async getContentsFromScenarioDefinitionFile(path) {
        let tmpDefinition;
        try {
            tmpDefinition = await scenarioDefinitionService.getFileContent(path);
            tmpDefinition = JSON.parse(tmpDefinition);
        } catch(err) {console.error(err)}

        return tmpDefinition;
    }
}

scenarioDefinitionStore = new ScenarioDefinitionStore();
export default scenarioDefinitionStore;