const m = require('mithril');
const {ipcRenderer} = require('electron');
import Page from '../js/page.js'

export const page = new Page('/warSim');
page.setPage(function() {

});