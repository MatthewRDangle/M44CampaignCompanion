export default class Overlay {
    constructor() {
        this.name = 'Unknown';
        this.images = [];
    }

    compile(definition) {
        this.name = definition.name || 'Unknown';
        if (Array.isArray(definition.images)) {
            this.images = definition.images;
        } else this.images = [];
    }
}