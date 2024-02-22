import m from 'mithril';
import Page from '../../models/Page.model.js';
import BoardGrid from "../../views/features/grids/BoardGrid.view.js"
import definitionStore from "../../stores/Definition.store.js";


export default new Page('/scenario', (initialVnode) => {


    return {
        view: (vNode) => {
            const {activeScenarioDefinition} = definitionStore;

            return ([
                m('img', {
                    className: 'absolute top-0 left-0 object-cover w-full h-full -z-10',
                    src: 'images/background.png',
                    role: 'presentation'
                }),
                m('div', {className: 'w-screen h-screen'}, m(BoardGrid, {scenario: activeScenarioDefinition}))
            ])
        }
    }
});
