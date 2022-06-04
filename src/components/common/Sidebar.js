const m = require("mithril");

import routeStore from "../../stores/RouteStore.js";


const Page = (initialVnode) => {


    return {
        view: (vNode) => {
            const {currentRoute, navRoutes} = routeStore;


            return m('div', {className: "h-screen w-64", 'aria-label': "Sidebar"},
                m('div', {className: 'h-full overflow-y-auto py-4 px-3 bg-foreground-100 rounded'},
                    m('ul', {className: 'space-y-2'}, [
                        navRoutes.map(item => (
                            m('li', [
                                m(m.route.Link, {
                                    href: item.path,
                                    className: 'flex items-center p-2 text-base font-normal text-font-900 rounded-lg hover:bg-foreground-100'
                                }, item.label)
                            ])
                        ))
                    ])
                )
            )
        }
    }
}

export default Page;