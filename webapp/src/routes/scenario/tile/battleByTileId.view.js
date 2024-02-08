import Page from '../../../models/Page.model.js';
import m from 'mithril';
import TitleBar from "../../../components/compounds/TitleBar.view.js";
import Body from "../../../components/layouts/Body.view.js";
import Background from "../../../components/primitives/Background.view.js";
import BattleCalculatorForm from "../../../components/features/forms/BattleCalculatorForm.view.js";
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