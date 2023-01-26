import ScenarioDefinition from "../classes/ScenarioDefinition.js";
import {scenarioDefinitionService} from "../services/scenarioDefinition.service.js";


let scenarioDefinitionStore;

class ScenarioDefinitionStore {

    constructor() {
        if (!scenarioDefinitionStore) {
            this.setActiveScenarioDefinition = this.setActiveScenarioDefinition.bind(this);
            this.getContentsFromScenarioDefinitionFile = this.getContentsFromScenarioDefinitionFile.bind(this);
            return this;
        } else
            return scenarioDefinitionStore;
    }

    activeScenarioDefinition = undefined;


    async setActiveScenarioDefinition(manifest) {
        let rawScenarioDefinition = undefined;
        try {
            if (typeof manifest.scenarioDefinition === 'string') { // Assume path to file.
                const pathToScenarioDefinition = manifest.pathToDir + manifest.scenarioDefinition;
                rawScenarioDefinition = await this.getContentsFromScenarioDefinitionFile(pathToScenarioDefinition);
            } else if (typeof manifest.scenarioDefinition === 'object') { // Assume definition is baked into file.
                rawScenarioDefinition = manifest.scenarioDefinition;
            }

            if (!!rawScenarioDefinition && !!rawScenarioDefinition.scripts) {
                const pathToScripts = [];
                for (let relativeScriptPath of rawScenarioDefinition.scripts)
                    pathToScripts.push(manifest.pathToDir + relativeScriptPath)
                if (!!pathToScripts.length)
                    rawScenarioDefinition.scripts = await scenarioDefinitionService.importScript(pathToScripts);
            }
        } catch (err) { console.error(err) }

        if (!!rawScenarioDefinition) {
            const scenarioDefinition = new ScenarioDefinition();
            await scenarioDefinition.import(rawScenarioDefinition);
            this.activeScenarioDefinition = scenarioDefinition;
        }
    }

    async getContentsFromScenarioDefinitionFile(path) {
        let tmpContents;
        try {
            tmpContents = await scenarioDefinitionService.getFileContent(path);
            tmpContents = JSON.parse(tmpContents);
        } catch(err) {console.error(err)}

        return tmpContents;
    }
}

scenarioDefinitionStore = new ScenarioDefinitionStore();
export default scenarioDefinitionStore;