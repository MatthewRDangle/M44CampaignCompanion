const m = require('mithril');
const {ipcRenderer} = require('electron');
import Page from '../classes/Page.js';
import MainMenu from "../components/MainMenu.js";


export const page = new Page('/mainMenu', (initialVnode) => {

    return {
        view: (vNode) => {
            const {attrs} = vNode;

            return m(MainMenu, {currentPage: this, title: 'Campaign Companion'}, [
                m('div', {onclick: () => {m.route.set('/lobby')}}, 'Skirmish'),
                m('div', {onclick: () => {ipcRenderer.send('close-app')}}, 'Exit to Desktop')
            ]);
        }
    }
});