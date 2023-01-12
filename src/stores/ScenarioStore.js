import {scenarioService} from "../services/scenario.service.js";
import Scenario from "../classes/Scenario.js";
import File from "../classes/ScenarioManifest.js";


let scenarioStore;

class ScenarioStore {

    constructor() {
        if (!scenarioStore) {
            this.setActiveScenario = this.setActiveScenario.bind(this);
            this.loadScenarioDefinition = this.loadScenarioDefinition.bind(this);
            this.clearScenarioManifestRegistry = this.clearScenarioManifestRegistry.bind(this);
            this.loadScenarioManifestRegistry = this.loadScenarioManifestRegistry.bind(this);;
            this.saveScenarioManifestRegistry = this.saveScenarioManifestRegistry.bind(this);
            this.updateScenarioManifestRegistry = this.updateScenarioManifestRegistry.bind(this);
            this.addOneScenarioManifest = this.addOneScenarioManifest.bind(this)
            this.deleteOneScenarioManifest = this.deleteOneScenarioManifest.bind(this);
            this.setTestData = this.setTestData.bind(this);
            return this;
        } else
            return scenarioStore;
    }

    manifestRegistry = {};
    definitionRegistry = {};
    activeScenario = undefined;


    get manifestRegistryList() {
        return Object.values(this.manifestRegistry).map(manifest => new File(manifest));
    };


    setActiveScenario(id) {
        (async () => {
            await this.loadScenarioDefinition(this.manifestRegistry[id]);
            this.activeScenario = new Scenario(this.definitionRegistry[id]);
        })()
    }


    clearScenarioManifestRegistry() {
        this.manifestRegistry = {};
    }


    async loadScenarioManifestRegistry() {
        let tmpManifestRegistry;
        try {
            tmpManifestRegistry = await scenarioService.getAll();
        } catch(e) {throw Error(e)}
        finally {
            this.clearScenarioManifestRegistry();
            Object.values(tmpManifestRegistry).forEach(manifestItem => {
                this.manifestRegistry[manifestItem.UUID] = manifestItem;
            });
        }
        return tmpManifestRegistry;
    }

    async addOneScenarioManifest(manifestItem) {
        let tmpManifestRegistry;
        try {
            tmpManifestRegistry = scenarioService.add(manifestItem);
        } catch(e) {throw Error(e)}
        finally {
            this.clearScenarioManifestRegistry();
            Object.values(tmpManifestRegistry).forEach(manifestItem => {
                this.manifestRegistry[manifestItem.id] = manifestItem;
            });
        }
    }

    async deleteOneScenarioManifest(manifestItem) {
        let tmpManifestRegistry;
        try {
            tmpManifestRegistry = scenarioService.delete(manifestItem);
        } catch(e) {throw Error(e)}
        finally {
            this.clearScenarioManifestRegistry();
            Object.values(tmpManifestRegistry).forEach(manifestItem => {
                this.manifestRegistry[manifestItem.id] = manifestItem;
            });
        }
    }

    async saveScenarioManifestRegistry() {
        let localRegistry;
        try {
            localRegistry = this.manifestRegistry;
            scenarioService.set(localRegistry);
        } catch(e) {throw Error(e)}
    }

    async updateScenarioManifestRegistry(file) {
        if (file instanceof File) {
            this.manifestRegistry[file.UUID] = {...file}
        }
    }

    async setTestData() {
        this.manifestRegistry = {
            "e9acae27-df81-4d20-a57a-cc0d010b4835": {
                "UUID": "e9acae27-df81-4d20-a57a-cc0d010b4835",
                "Name": "Winter Storm",
                "Factions" : "USSR vs. Germany",
                "Size": {
                    "columns": 10,
                    "rows": 10
                },
                "Version": [1,0,0]
            },
            "45fa49c1-6138-4018-b6c9-ab7ce770078a": {
                "UUID": "45fa49c1-6138-4018-b6c9-ab7ce770078a",
                "Name": "Training Grounds",
                "Factions" : "United States vs. Germany",
                "Size": {
                    "columns": 26,
                    "rows": 12
                },
                "Version": [1,0,0]
            }
        }

        await this.saveScenarioManifestRegistry();
    }

    async loadScenarioDefinition(registryItem) {
        let tmpDefinition;
        try {
            tmpDefinition = await scenarioService.loadFile(registryItem);
        } catch(e) {throw Error(e)}
        finally {
            if (!!tmpDefinition)
                this.definitionRegistry[registryItem.id] = tmpDefinition;
        }
        return tmpDefinition;
    }
}

scenarioStore = new ScenarioStore();
export default scenarioStore;