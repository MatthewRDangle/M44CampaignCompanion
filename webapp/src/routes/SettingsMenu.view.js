import m from 'mithril';
import Page from '../models/Page.model.js';
import MainLayout from "../components/layouts/MenuLayout.view.js";
import { settingsNav } from "../lists/nav";


export default new Page('/settings', (initialVnode) => {


    return {
        view: (vNode) => {


            return m(MainLayout, {list: settingsNav, title: 'Settings'})
        }
    }
});