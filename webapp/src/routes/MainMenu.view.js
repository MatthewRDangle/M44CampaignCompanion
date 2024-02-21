import m from 'mithril';
import Page from '../models/Page.model.js';
import MainLayout from "../components/layouts/MenuLayout.view.js";
import { mainNav } from "../lists/nav";


export default new Page('/', (initialVnode) => {


    return {
        view: (vNode) => {


            return m(MainLayout, {list: mainNav, title: 'Main Menu'})
        }
    }
});