const m = require("mithril");

import {routeService} from "../services/route.service.js";
import {nav} from "../lists/nav.js";


let routeStore;

class RouteStore {

    constructor() {
        if (!routeStore) {
            this.clearRoutes = this.clearRoutes.bind(this);
            this.loadAllRoutes = this.loadAllRoutes.bind(this);
            return this;
        } else
            return routeStore;
    }


    routeList = [];

    get currentRoute() {
        return m.route.get();
    }

    get navRoutes() {
        return nav;
    }


    clearRoutes() {
        this.routeList = [];
    }


    async loadAllRoutes() {
        let tmpRegistry;
        try {
            tmpRegistry = await routeService.getAll();
        } catch(e) {throw Error(e)}
        finally {
            this.clearRoutes();
            this.routeList = tmpRegistry;
        }
        return tmpRegistry;
    }
}

routeStore = new RouteStore();
export default routeStore;