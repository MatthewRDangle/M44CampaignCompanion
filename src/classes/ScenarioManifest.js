export default class ScenarioManifest {
    constructor(manifest) {
        this.UUID = manifest.UUID;
        this.Name = manifest.Name;
        this.Factions = manifest.Factions;
        this.Size = {
            columns: manifest.Size?.columns,
            rows: manifest.Size?.rows
        }
        this.Version = manifest.Version
    }
}