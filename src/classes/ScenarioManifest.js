export default class ScenarioManifest {
    constructor(manifest) {
        this.format_version = manifest.format_version ?? 1;

        this.UUID = manifest.UUID;
        this.name = manifest.name;
        this.factions = manifest.factions;
        this.size = {
            columns: manifest.size?.columns,
            rows: manifest.size?.rows
        }

        this.scenarioDefinition = manifest.scenarioDefinition;
        this.version = manifest.version;

        this.fileName = manifest.fileName;
        this.pathToDir = manifest.pathToDir;
    }
}