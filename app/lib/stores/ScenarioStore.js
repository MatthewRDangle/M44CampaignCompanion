import {scenarioService} from "../services/scenario.service.js";


class ScenarioStore {

    constructor() {
        this.loadAllScenarios = this.loadAllScenarios.bind(this);
    }

    registry = {};

    get scenarioList() {
        return Object.values(this.registry);
    };

    async loadAllScenarios() {
        let tmpRegistry;
        try {
            tmpRegistry = await scenarioService.getAll();
        } catch(e) {throw Error(e)}
        finally {
            if (tmpRegistry)
                this.registry = tmpRegistry;
        }
    }
}

const scenarioStore = new ScenarioStore();
export default scenarioStore;