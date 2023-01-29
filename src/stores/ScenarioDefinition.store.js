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

            // Convert all URLS into absolute paths.
            if (!!rawScenarioDefinition) {

                // Unit Templates
                if (!!rawScenarioDefinition?.unit_templates) {
                    for (let key in rawScenarioDefinition?.unit_templates) {
                    const unit_template = rawScenarioDefinition?.unit_templates[key];
                        if (!!unit_template?.icon?.src && typeof !!unit_template?.icon?.src === 'string')
                            unit_template.icon.src = manifest.pathToDir = unit_template.icon.src;
                    }
                }

                // Battle Maps
                if (!!rawScenarioDefinition?.battleMaps.length) {
                    rawScenarioDefinition?.battleMaps.forEach(battleMap => {
                        if (!!battleMap.src && typeof battleMap.src === 'string')
                            battleMap.src = manifest.pathToDir + battleMap.src;
                    })
                }

            }
        } catch (err) { console.error(err) }

        if (!!rawScenarioDefinition) {
            const scenarioDefinition = new ScenarioDefinition();
            await scenarioDefinition.compile(rawScenarioDefinition);
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