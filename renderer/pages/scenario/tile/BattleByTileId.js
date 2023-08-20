const m = require('mithril');

import Page from '../../../models/Page.js';
import TitleBar from "../../../components/TitleBar.js";
import Body from "../../../components/Body.js";
import Background from "../../../components/Background.js";
import BattleCalculatorForm from "../../../components/form/BattleCalculatorForm.js";
import ScenarioDefinitionStore from "../../../stores/definition.store.js";

export const page = new Page('/scenario/tile/:tileId/battle', (initialVnode) => {


    return {
        view: (vNode) => {
            const {attrs} = vNode;
            const {activeScenarioDefinition} = ScenarioDefinitionStore;

            const tile = activeScenarioDefinition.fetchTileReferenceById(attrs.tileId);

            const handlePostpone = (e) => {
                m.route.set(`/scenario/tile/${tile.id}/setup`)
            }

            const handleResolve = (e, resolved) => {
                if (resolved) m.route.set('/scenario');
            }

            return m(Body, [
                m(Background),
                m(TitleBar, 'Battle Results'),
                m('div', {className: 'mt-8'},
                    m(BattleCalculatorForm, {
                        tile: tile,
                        onPostpone: handlePostpone,
                        onResolve: handleResolve
                    })
                )
            ])
        }
    }
});