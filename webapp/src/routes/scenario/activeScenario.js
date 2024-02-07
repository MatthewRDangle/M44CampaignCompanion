const m = require('mithril');

import Page from '../../models/Page.model.js';
import BoardGrid from "../../components/grid/BoardGrid.component.js"
import definitionStore from "../../stores/Definition.store.js";
import boardStore from "../../stores/Board.store.js";


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
