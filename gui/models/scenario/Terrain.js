export default class Terrain {
    constructor() {
        this.name = 'Unknown';
        this.movement_cost = 0;
        this.movement_cost_modifiers_by_type = {};
        this.max_units_allowed = undefined;
        this.max_units_allowed_per_faction = undefined;
        this.inaccessible_by = [];
        this.color = 'transparent';
        this.render = false;
    }

    compile(terrainDefinition) {
        if (terrainDefinition.render !== false) {
            this.name = terrainDefinition.name || 'Unknown';
            this.movement_cost = terrainDefinition?.movement_cost || 1;
            this.movement_cost_modifiers_by_type = terrainDefinition?.movement_cost_modifiers_by_type || {};
            this.max_units_allowed = terrainDefinition.max_units_allowed || undefined;
            this.max_units_allowed_per_faction = terrainDefinition.max_units_allowed_per_faction || undefined;
            this.inaccessible_by = terrainDefinition?.inaccessible_by || [];
            this.color = terrainDefinition?.color || '#000000';
            this.render = true;
        }
    }
}