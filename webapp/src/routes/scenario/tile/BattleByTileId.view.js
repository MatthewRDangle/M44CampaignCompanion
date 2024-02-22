import m from 'mithril';
import Page from '../../../models/Page.model.js';
import TitleBar from "../../../views//TitleBar.view.js";
import Body from "../../../views/layouts/BodyLayout.view.js";
import Background from "../../../views/Background.view.js";
import BattleCalculatorForm from "../../../views/features/forms/BattleCalculatorForm.view.js";
import ScenarioDefinitionStore from "../../../stores/Definition.store.js";

export default new Page('/scenario/tile/:tileId/battle', (initialVnode) => {


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