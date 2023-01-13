const m = require('mithril');

import Page from '../../classes/Page.js';
import ScenarioDefinitionStore from "../../stores/ScenarioDefinition.store.js";

export const page = new Page('/session/preview?:tileId', (initialVnode) => {


    return {
        view: (vNode) => {
            const {attrs} = vNode;
            const {activeScenarioDefinition} = ScenarioDefinitionStore;

            const tileId = attrs.tileId;
            const [row, column] = tileId.split('-');
            const tile = activeScenarioDefinition.tiles[row][tileId];


            return [
                m('div', {style: 'width: 100vw; height: 100vh;'},
                    m('div.preview',
                        m('img.preview_img', {
                            src: tile.battleMap?.src || '',
                            alt: tile.battleMap?.alt || '',
                            onclick: function() {
                                m.route.set('/session')
                            }
                        })
                    )
                )
            ]
        }
    }
});