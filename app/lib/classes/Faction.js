export default class Faction {
    constructor(name, options) {
        if (!name)
            throw Error('Unable to create faction without a name.');

        this.name = name;
        this.color = {
            color: options?.color || '#151A1E',
            backgroundColor: options?.backgroundColor || '#95B07E'
        };
        this.currentTurn = options?.currentTurn || false;
    }
}