const __pages = {};

export default class Page {
    constructor(name, component) {
        if (!name || typeof name !== 'string')
            throw Error('Unable to build a page without a name.');
        if (!component)
            throw Error('Unable to build a page without a mithril component.');

        if (__pages.hasOwnProperty(name))
            throw Error('Page ' + name + 'already exists.');
        __pages[name] = this;

        this.path = name;
        this.component = component;
    }
}