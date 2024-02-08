import m from 'mithril';
import {nav} from "../lists/nav.js";


let routeStore;

class RouteStore {

    constructor() {
        if (!routeStore) {
            this.clearRoutes = this.clearRoutes.bind(this);
            // this.loadAllRoutes = this.loadAllRoutes.bind(this);
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
}

routeStore = new RouteStore();
export default routeStore;