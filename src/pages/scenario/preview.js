const m = require('mithril');

import Page from '../../classes/Page.js';
import scenarioManifestStore from "../../stores/ScenarioManifest.store.js";

export const page = new Page('/scenario/preview?:tileId', (initialVnode) => {


    return {
        view: (vNode) => {
            const {attrs} = vNode;
            const {activeScenario} = scenarioManifestStore;

            const tileId = attrs.tileId;
            const [row, column] = tileId.split('-');
            const tile = activeScenario.tiles[row][tileId];


            return [
                m('div', {style: 'width: 100vw; height: 100vh;'},
                    m('div.preview',
                        m('img.preview_img', {
                            src: tile.battleMap?.src || '',
                            alt: tile.battleMap?.alt || '',
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