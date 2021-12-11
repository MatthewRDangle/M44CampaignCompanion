const m = require('mithril');

let __pages = {};

export default class Page {
    constructor(name) {
        if (!name || typeof name !== 'string')
            throw Error('Unable to build a page without a name.');
        this.path = name;
        this.loadPage = undefined;

        if (__pages.hasOwnProperty(name))
            throw Error('Page ' + name + 'already exists.');
        __pages[name] = this;
    }

    view() {
        return m('div.view', (this.loadPage) ? this.loadPage() : '')
    }
    setPage(func) {
        if (func && typeof func === 'function')
            this.loadPage = func;
    }

    navigate(path) {
        if (path && typeof path === 'string')
            m.route.set(path);
    }
}