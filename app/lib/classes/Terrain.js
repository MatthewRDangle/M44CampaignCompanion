export default class Terrain {
    constructor(options) {
        this.name = options?.name || 'Unknown';
        this.movement_cost = options?.movement_cost || 1;
        this.movement_cost_modifiers_by_type = options?.movement_cost_modifiers_by_type || {};
        this.inaccessible_by = options?.inaccessible_by || [];
        this.color = options?.color || '#000000';
    }
}