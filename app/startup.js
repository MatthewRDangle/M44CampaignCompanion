const m = require('mithril');
const fs = require('fs');
import Page from './lib/models/page.js';

try {
    let pages = [];
    await fs.readdir('app/lib/pages', (err, files) => {
        files.forEach((file, index, array) => {
            import('./lib/pages/' + file).then(module => {
                pages.push(module.page);
                if (index + 1 >= array.length)
                    config_router(pages);
            });
        });
    })
} catch(err) { console.error(err); }

const config_router = function(pages) {
    if (pages) {
        let router = {};
        pages.forEach((page) => {
            router[page.path] = page;
        });
        if (!router.hasOwnProperty('/main'))
            router['/main'] = new Page('/main');
        m.route(document.body, "/warSim", router);
    }
}