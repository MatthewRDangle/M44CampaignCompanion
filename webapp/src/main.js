import m from 'mithril';
import routes from './lists/pages'

(async () => {
    const router = {}
    routes.forEach((module) => {
        router[module.path] = module.component
    })
    m.route(document.body, "/", router)
})();