const m = require('mithril');

import Page from '../../../models/Page.model.js';
import Body from "../../../components/Body.component.js";
import Button from "../../../components/Button.component.js";
import Background from "../../../components/Background.component.js";
import ScenarioDefinitionStore from "../../../stores/Definition.store.js";

export const page = new Page('/scenario/tile/:tileId/setup', (initialVnode) => {

    const handlePostpone = () => {
        m.route.set('/scenario')
    }

    const handleToBattleCalculator = (e, tile) => {
        m.route.set(`/scenario/tile/${tile.id}/battle`)
    }


    return {
        view: (vNode) => {
            const {attrs} = vNode;
            const {activeScenarioDefinition} = ScenarioDefinitionStore;

            const tile = activeScenarioDefinition.fetchTileReferenceById(attrs.tileId);


            return m(Body, [
                m(Background),
                m('div', {className: 'w-full h-full p-12 overflow-y-scroll'},
                    m('img', {
                        className: 'w-1/2 m-auto object-cover shadow-lg shadow-background-500/50',
                        src: tile.battleMap?.src || '',
                        alt: tile.battleMap?.alt || ''
                    }),
                    m('h1', { className: 'text-center text-xl my-2' }, tile.setup?.title ?? ''),
                    tile.setup?.instructions.map(text => m('p', { className: 'my-1' }, text)),
                ),
                m('div', {className: 'absolute left-[5%] bottom-[5%]'},
                    m(Button, {
                        type: 'button',
                        onclick: handlePostpone
                    }, 'Back'),
                ),
                m('div', {className: 'absolute right-[5%] bottom-[5%]'},
                    m(Button, {
                        type: 'button',
                        onclick: (e) => handleToBattleCalculator(e, tile)
                    }, 'Calculate')
                )
            ])
        }
    }
});