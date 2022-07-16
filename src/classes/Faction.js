export default class Faction {
    constructor(name, options) {
        if (!name)
            throw Error('Unable to create faction without a name.');

        this.name = name;
        this.color = {
            text: options?.color?.text || '#151A1E',
            background: options?.color?.background || '#95B07E'
        };
        this.currentTurn = options?.currentTurn || false;
    }
}