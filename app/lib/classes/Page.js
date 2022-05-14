const __pages = {};

export default class Page {
    constructor(path, component) {
        if (!path || typeof path !== 'string')
            throw Error('Unable to build a page without a path.');
        if (!component)
            throw Error('Unable to build a page without a mithril component.');

        if (__pages.hasOwnProperty(path))
            throw Error(`Page ${path} already exists.`);
        __pages[path] = this;

        this.path = path;
        this.component = component;
    }
}