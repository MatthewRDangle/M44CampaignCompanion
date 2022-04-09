const m = require('mithril');
import Page from '../classes/Page.js';
import {activeScenario} from "../../global.js";

export const page = new Page('/preview/:tileId', {
    view: (vNode) => {
        const {attrs} = vNode;
        const tileId = attrs.tileId;
        const [series, column, row] = tileId.split('-');
        const tile = activeScenario.tiles[row - 1][tileId];

        return [
            m('div', {style: 'width: 100vw; height: 100vh;'},
                m('div.preview',
                    m('img.preview_img', {
                        src: tile.preview?.src || '',
                        alt: tile.preview?.alt || '',
                        onclick: function() {
                            m.route.set('/warSim')
                        }
                    })
                )
            )
        ]
    }
});