const m = require('mithril');

import Page from '../../classes/Page.js';
import scenarioStore from "../../stores/ScenarioStore.js";

export const page = new Page('/scenario/preview?:tileId', (initialVnode) => {


    return {
        view: (vNode) => {
            const {attrs} = vNode;
            const {activeScenario} = scenarioStore;

            const tileId = attrs.tileId;
            const [row, column] = tileId.split('-');
            const tile = activeScenario.tiles[row][tileId];


            return [
                m('div', {style: 'width: 100vw; height: 100vh;'},
                    m('div.preview',
                        m('img.preview_img', {
                            src: tile.preview?.src || '',
                            alt: tile.preview?.alt || '',
                            onclick: function() {
                                m.route.set('/scenario')
                            }
                        })
                    )
                )
            ]
        }
    }
});