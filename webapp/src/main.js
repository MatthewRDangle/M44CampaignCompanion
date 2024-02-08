import m from 'mithril';import routes from './routes/index.js'

(async () => {
    const router = {}
    routes.forEach((module) => {
        router[module.path] = module.component
    })
    m.route(document.body, "/splash", router)
})();