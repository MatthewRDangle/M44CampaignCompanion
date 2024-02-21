import m from 'mithril';
import Page from '../models/Page.model.js';
import MainLayout from "../components/layouts/MenuLayout.view.js";
import { playNav } from "../lists/nav";


export default new Page('/session', (initialVnode) => {


    return {
        view: (vNode) => {


            return m(MainLayout, {list: playNav, title: 'Play'})
        }
    }
});