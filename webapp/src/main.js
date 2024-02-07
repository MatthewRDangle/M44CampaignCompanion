import m from 'mithril';

import routes from './routes/index.js'
// import Page from "./models/Page.model.js";
// import routeStore from "./stores/Route.store.js";


(async () => {
    const router = {}
    routes.forEach((module) => {
        router[module.path] = module.component
    })
    m.route(document.body, "/splash", router)
})();