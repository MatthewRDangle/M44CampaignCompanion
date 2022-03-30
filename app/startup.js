const m = require('mithril');
const fs = require('fs');
import Page from './lib/classes/Page.js';

fs.readdir('app/lib/pages', async (err, files) => {
    const pages = await Promise.all(files.map(async slug => {
        const module = await import('./lib/pages/' + slug);
        if (module.page)
            return module.page;
    }));
    config_router(pages);
});

const config_router = function(pages) {
    if (pages) {
        let router = {};
        pages.forEach((page) => {
            router[page.path] = page;
        });
        if (!router.hasOwnProperty('/main'))
            router['/main'] = new Page('/main');
        m.route(document.body, "/main", router);
    }
}