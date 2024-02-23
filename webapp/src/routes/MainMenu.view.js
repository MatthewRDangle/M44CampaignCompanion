import m from 'mithril';
import MainLayout from "../views/layouts/MenuLayout.view.js";
import Nav from "../views/Nav.view";
import Page from '../models/Page.model.js';
import mainNav from "../lists/navs/main.nav.js";


export default new Page('/', (initialVnode) => {


    return {
        view: (vNode) => {


            return m(MainLayout, m(Nav, { list: mainNav }))
        }
    }
});