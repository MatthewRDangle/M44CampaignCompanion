export default class FileRegistryItem {
    constructor(registryItem) {
        this.slug = registryItem.slug;
        this.path = registryItem.path;

        this.displayName = registryItem.displayName || '';
    }
}