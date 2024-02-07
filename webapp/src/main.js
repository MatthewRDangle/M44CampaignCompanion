const m = require('mithril');

import router from './pages/index.js'
// import Page from "./models/Page.model.js";
// import routeStore from "./stores/Route.store.js";


(async () => {
    m.route(document.body, "/splash", router)
    // const pageList = await routeStore.loadAllRoutes();
    // const pageModules = await Promise.all(pageList.map(async location => {
    //     const module = await import(location);
    //     const {page} = module;
    //
    //     if (page)
    //         return page;
    // }));
    //
    // let router = {};
    // pageModules.forEach((module) => {
    //     router[module.path] = module.component;
    // });
    // if (!router.hasOwnProperty('/mainmenu'))
    //     router['/mainmenu'] = new Page('/mainmenu', {view: () => {return ''}});
    // m.route(document.body, "/splash", router);
})();