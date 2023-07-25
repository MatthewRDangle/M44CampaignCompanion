import Definition from "../models/scenario/Definition.js";
import {definitionService} from "../services/definition.service.js";


let definitionStore;

class ScenarioDefinitionStore {

    constructor() {
        if (!definitionStore) {
            this.setActiveScenarioDefinition = this.setActiveScenarioDefinition.bind(this);
            this.getContentsFromScenarioDefinitionFile = this.getContentsFromScenarioDefinitionFile.bind(this);
            return this;
        } else
            return definitionStore;
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

                // Overlays
                if (!!rawScenarioDefinition?.overlays) {
                    for (let key in rawScenarioDefinition?.overlays) {
                        const overlay = rawScenarioDefinition?.overlays[key];
                        if (!!overlay?.images && Array.isArray(overlay?.images)) {
                            overlay.images.forEach((src, idx) => {
                                overlay.images[idx] = manifest.pathToDir + src;
                            })
                        }
                    }
                }

                // Factions
                if (!!rawScenarioDefinition?.factions) {
                    for (let key in rawScenarioDefinition?.factions) {
                        const unit_template = rawScenarioDefinition?.factions[key];
                        if (!!unit_template?.icon?.src && typeof unit_template?.icon?.src === 'string')
                            unit_template.icon.src = manifest.pathToDir + unit_template.icon.src;
                        if (!!unit_template?.flag?.src && typeof unit_template?.flag?.src === 'string')
                            unit_template.flag.src = manifest.pathToDir + unit_template.flag.src;
                    }
                }

                // Unit
                if (!!rawScenarioDefinition?.unit_templates) {
                    for (let key in rawScenarioDefinition?.unit_templates) {
                        const unit_template = rawScenarioDefinition?.unit_templates[key];
                        if (!!unit_template?.icon?.src && typeof unit_template?.icon?.src === 'string')
                            unit_template.icon.src = manifest.pathToDir + unit_template.icon.src;
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
            const scenarioDefinition = new Definition();
            await scenarioDefinition.compile(rawScenarioDefinition);
            this.activeScenarioDefinition = scenarioDefinition;
        }
    }

    async getContentsFromScenarioDefinitionFile(path) {
        let tmpContents;
        try {
            tmpContents = await definitionService.getFileContent(path);
            tmpContents = JSON.parse(tmpContents);
        } catch(err) {console.error(err)}

        return tmpContents;
    }
}

definitionStore = new ScenarioDefinitionStore();
export default definitionStore;