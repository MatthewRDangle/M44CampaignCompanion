const m = require("mithril");
const {ipcRenderer} = require('electron');

import routeStore from "../stores/RouteStore.js";


const Body = (initialVnode) => {


    return {
        view: (vNode) => {
            const {currentRoute, navRoutes} = routeStore;

            return m('nav', [
                navRoutes.map(item => (
                    m('div', [
                        m(m.route.Link, {
                            href: item.path,
                            className: 'flex items-center p-2 text-base font-normal text-font-900 rounded-lg hover:bg-foreground-100'
                        }, item.label)
                    ])
                )),
            ])
        }
    }
}

export default Body;