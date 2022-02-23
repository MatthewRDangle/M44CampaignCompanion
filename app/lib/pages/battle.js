const m = require('mithril');
import Page from '../models/page.js';
import GameBoard from "../models/gameboard.js";
import {localData} from "../../localdata.js";

export const page = new Page('/battle');
page.setPage(function() {
    return [
        m('div', {style: 'width: 100vw; height: 100vh;'},
            m('div.preview',
                m('img.preview_img', {src: 'lib/images/placeholder.PNG', alt: ''})
            )
        )
    ]
});