import m from 'mithril';
import Page from '../../../models/Page.model.js';
import Body from "../../../components/layouts/Body.view.js";
import Button from "../../../components/primitives/Button.view.js";
import Background from "../../../components/primitives/Background.view.js";
import ScenarioDefinitionStore from "../../../stores/Definition.store.js";

export default new Page('/scenario/tile/:tileId/map', (initialVnode) => {


    return {
        view: (vNode) => {
            const {attrs} = vNode;
            const {activeScenarioDefinition} = ScenarioDefinitionStore;

            const tile = activeScenarioDefinition.fetchTileReferenceById(attrs.tileId);

            return m(Body, [
                m(Background),
                m('div', {className: 'w-full h-full p-12'},
                    m('img', {
                        className: 'w-full h-full object-cover shadow-lg shadow-background-500/50',
                        src: tile.battleMap?.src || '',
                        alt: tile.battleMap?.alt || ''
                    })
                ),
                m('div', {className: 'absolute top-16 right-16'},
                    m(Button, {
                        shadow: true,
                        inverse: true,
                        onclick: function() {
                            m.route.set('/scenario')
                        }
                    }, 'Close')
                )
            ])
        }
    }
});