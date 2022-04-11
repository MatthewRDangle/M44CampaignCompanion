export default class Terrain {
    constructor(options) {
        this.name = options?.name || 'Unknown';
        this.movement_cost = options?.movement_cost || 1;
        this.color = options?.color || '#000000';
    }
}