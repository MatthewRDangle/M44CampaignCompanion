export default class File {
    constructor(registryItem) {
        this.id = registryItem.id;
        this.slug = registryItem.slug;
        this.path = registryItem.path;

        this.displayName = registryItem.displayName || '';
    }
}