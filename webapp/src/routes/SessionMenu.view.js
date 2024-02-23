import m from 'mithril';
import MainLayout from '../views/layouts/MenuLayout.view.js';
import Nav from '../views/Nav.view';
import Page from '../models/Page.model.js';
import sessionNav from '../lists/navs/session.nav.js';


export default new Page('/session', (initialVnode) => {


    return {
        view: (vNode) => {


            return m(MainLayout, m(Nav, { list: sessionNav }))
        }
    }
});