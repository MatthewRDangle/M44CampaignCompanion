const YAML = require('js-yaml');

import {manifestService} from "../services/manifest.service.js";
import Manifest from "../models/scenario/Manifest.model.js";


let manifestStore;

class ScenarioManifestStore {

    constructor() {
        if (!manifestStore) {
            this.clearScenarioManifestRegistry = this.clearScenarioManifestRegistry.bind(this);
            this.loadScenarioManifestRegistry = this.loadScenarioManifestRegistry.bind(this);
            this.addOneScenarioManifest = this.addOneScenarioManifest.bind(this)
            this.deleteOneScenarioManifest = this.deleteOneScenarioManifest.bind(this);
            return this;
        } else
            return manifestStore;
    }

    manifestRegistry = {};


    get manifestRegistryList() {
        return Object.values(this.manifestRegistry).map(manifest => new Manifest(manifest));
    };


    clearScenarioManifestRegistry() {
        this.manifestRegistry = {};
    }


    async loadScenarioManifestRegistry() {
        let tmpManifestRegistry;
        try {
            tmpManifestRegistry = await manifestService.getAll();
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
            tmpManifestRegistry = manifestService.add(manifestItem);
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
            tmpManifestRegistry = manifestService.delete(manifestItem);
        } catch(e) {throw Error(e)}
        finally {
            this.clearScenarioManifestRegistry();
            Object.values(tmpManifestRegistry).forEach(manifestItem => {
                this.manifestRegistry[manifestItem.id] = manifestItem;
            });
        }
    }

    async getContentsFromScenarioManifestFile(file) {
        let parsedContents;
        try {
            const tmpManifest = await manifestService.getFileContent(file.path);

            const pathArray = file.path.split('.');
            const fileExtension = pathArray[pathArray.length - 1].toLowerCase();
            if (fileExtension === 'json')
                parsedContents = JSON.parse(tmpManifest);
            else if (fileExtension === 'yml' || fileExtension === 'yaml')
                parsedContents = YAML.load(tmpManifest);

            parsedContents.pathToDir = file.path.replaceAll(file.name, "");
            parsedContents.fileName = file.name;
        } catch(err) {console.error(err)}

        return parsedContents;
    }
}

manifestStore = new ScenarioManifestStore();
export default manifestStore;