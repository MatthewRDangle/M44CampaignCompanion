import {scenarioManifestService} from "../services/scenarioManifest.service.js";
import ScenarioManifest from "../models/scenario/ScenarioManifest.js";


let scenarioManifestStore;

class ScenarioManifestStore {

    constructor() {
        if (!scenarioManifestStore) {
            this.clearScenarioManifestRegistry = this.clearScenarioManifestRegistry.bind(this);
            this.loadScenarioManifestRegistry = this.loadScenarioManifestRegistry.bind(this);;
            this.addOneScenarioManifest = this.addOneScenarioManifest.bind(this)
            this.deleteOneScenarioManifest = this.deleteOneScenarioManifest.bind(this);
            return this;
        } else
            return scenarioManifestStore;
    }

    manifestRegistry = {};


    get manifestRegistryList() {
        return Object.values(this.manifestRegistry).map(manifest => new ScenarioManifest(manifest));
    };


    clearScenarioManifestRegistry() {
        this.manifestRegistry = {};
    }


    async loadScenarioManifestRegistry() {
        let tmpManifestRegistry;
        try {
            tmpManifestRegistry = await scenarioManifestService.getAll();
        } catch(e) {throw Error(e)}
        finally {
            this.clearScenarioManifestRegistry();
            this.manifestRegistry = {...tmpManifestRegistry};
        }
        return tmpManifestRegistry;
    }

    async addOneScenarioManifest(manifestItem) {
        let tmpManifestRegistry;
        try {
            tmpManifestRegistry = scenarioManifestService.add(manifestItem);
        } catch(e) {throw Error(e)}
        finally {
            if (tmpManifestRegistry.UUID) {
                this.clearScenarioManifestRegistry();
                this.manifestRegistry = {...tmpManifestRegistry};
            }
        }
    }

    async deleteOneScenarioManifest(manifestItem) {
        let tmpManifestRegistry;
        try {
            tmpManifestRegistry = scenarioManifestService.delete(manifestItem);
        } catch(e) {throw Error(e)}
        finally {
            this.clearScenarioManifestRegistry();
            Object.values(tmpManifestRegistry).forEach(manifestItem => {
                this.manifestRegistry[manifestItem.id] = manifestItem;
            });
        }
    }

    async getContentsFromScenarioManifestFile(file) {
        let tmpManifest;
        try {
            tmpManifest = await scenarioManifestService.getFileContent(file.path);
            tmpManifest = JSON.parse(tmpManifest);
            tmpManifest.pathToDir = file.path.replaceAll(file.name, "");
            tmpManifest.fileName = file.name;
        } catch(err) {console.error(err)}

        return tmpManifest;
    }
}

scenarioManifestStore = new ScenarioManifestStore();
export default scenarioManifestStore;