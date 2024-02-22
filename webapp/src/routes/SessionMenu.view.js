import m from 'mithril';
import Page from '../models/Page.model.js';
import MainLayout from "../views/layouts/MenuLayout.view.js";
import Nav from "../views/Nav.view";
import { playNav } from "../lists/nav";


export default new Page('/session', (initialVnode) => {


    return {
        view: (vNode) => {


            return m(MainLayout, m(Nav, { list: playNav }))
        }
    }
});