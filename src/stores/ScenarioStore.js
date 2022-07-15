import {scenarioService} from "../services/scenario.service.js";
import Scenario from "../classes/Scenario.js";
import File from "../classes/File.js";


let scenarioStore;

class ScenarioStore {

    constructor() {
        if (!scenarioStore) {
            this.setActiveScenario = this.setActiveScenario.bind(this);
            this.clearScenarioFileRegistry = this.clearScenarioFileRegistry.bind(this);
            this.loadScenarioFileRegistry = this.loadScenarioFileRegistry.bind(this);
            this.addScenarioFileToRegistry = this.addScenarioFileToRegistry.bind(this);
            this.saveScenarioFileRegistry = this.saveScenarioFileRegistry.bind(this);
            this.updateScenarioFileRegistry = this.updateScenarioFileRegistry.bind(this);
            this.setTestData = this.setTestData.bind(this);
            this.loadScenarioDefinition = this.loadScenarioDefinition.bind(this);
            return this;
        } else
            return scenarioStore;
    }

    fileRegistry = {};
    definitionRegistry = {};
    activeScenario = undefined;


    get fileRegistryList() {
        return Object.values(this.fileRegistry).map(registryItem => new File(registryItem));
    };


    setActiveScenario(id) {
        (async () => {
            await this.loadScenarioDefinition(this.fileRegistry[id]);
            this.activeScenario = new Scenario(this.definitionRegistry[id]);
        })()
    }


    clearScenarioFileRegistry() {
        this.fileRegistry = {};
    }


    async loadScenarioFileRegistry() {
        let tmpRegistry;
        try {
            tmpRegistry = await scenarioService.getAll();
        } catch(e) {throw Error(e)}
        finally {
            this.clearScenarioFileRegistry();
            Object.values(tmpRegistry).forEach(registryItem => {
                this.fileRegistry[registryItem.id] = registryItem;
            });
        }
        return tmpRegistry;
    }

    async addScenarioFileToRegistry(registryItem) {
        let tmpRegistry;
        try {
            tmpRegistry = scenarioService.add(registryItem);
        } catch(e) {throw Error(e)}
        finally {
            this.clearScenarioFileRegistry();
            Object.values(tmpRegistry).forEach(registryItem => {
                this.fileRegistry[registryItem.id] = registryItem;
            });
        }
    }

    async saveScenarioFileRegistry() {
        let localRegistry;
        try {
            localRegistry = this.fileRegistry;
            scenarioService.set(localRegistry);
        } catch(e) {throw Error(e)}
    }

    async updateScenarioFileRegistry(file) {
        if (file instanceof File) {
            this.fileRegistry[file.id] = {
                id: file.id,
                slug: file.slug,
                path: file.path,
                displayName: file.displayName
            }
        }
    }

    async setTestData() {
        this.fileRegistry = {
            "test1": {
                "id": "42baa135-d5b2-4f87-97eb-5ab5bd2ab363",
                "slug": "scenario_definition_2.json",
                "path": "test/scenario_definition_2.json",
                "displayName": "Training Grounds"
            },
            "test2": {
                "id": "35ca6e80-2f12-4d40-aab2-6720367aa7e8",
                "slug": "scenario_definition_1.json",
                "path": "test/scenario_definition_1.json",
                "displayName": "Water Cross Bridge"
            }
        }

        await this.saveScenarioFileRegistry();
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