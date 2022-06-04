import {scenarioService} from "../services/scenario.service.js";
import Scenario from "../classes/Scenario.js";


let scenarioStore;

class ScenarioStore {

    constructor() {
        if (!scenarioStore) {
            this.setActiveScenario = this.setActiveScenario.bind(this);
            this.clearScenarioFileRegistry = this.clearScenarioFileRegistry.bind(this);
            this.loadScenarioFileRegistry = this.loadScenarioFileRegistry.bind(this);
            this.loadScenarioDefinition = this.loadScenarioDefinition.bind(this);
            return this;
        } else
            return scenarioStore;
    }

    fileRegistry = {};
    definitionRegistry = {};
    activeScenario = undefined;


    get fileRegistryList() {
        return Object.values(this.fileRegistry);
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
            tmpRegistry = await scenarioService.getRegistry();
        } catch(e) {throw Error(e)}
        finally {
            this.clearScenarioFileRegistry();
            Object.values(tmpRegistry).forEach(registryItem => {
                this.fileRegistry[registryItem.id] = registryItem;
            });
        }
        return tmpRegistry;
    }

    async loadScenarioDefinition(registryItem) {
        let tmpDefinition;
        try {
            tmpDefinition = await scenarioService.getDefinition(registryItem);
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