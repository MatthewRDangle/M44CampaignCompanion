class Scenario {
    constructor(scenario_config) {
        if (!scenario_config || typeof scenario_config !== 'object')
            scenario_config = {};

        this.devMode = scenario_config.devMode || false;
        this.columns = scenario_config.columns || 1;
        this.rows = scenario_config.rows || 1;

        this.factions = scenario_config.factions || [];
        this.tiles = scenario_config.tiles || {};
    }
}