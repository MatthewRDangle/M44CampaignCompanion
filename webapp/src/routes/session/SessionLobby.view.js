import m from 'mithril';
import LobbyLayout from "../../views/layouts/LobbyLayout.view";
import Table from "../../views/Table.view";
import Button from "../../views/Button.view";
import Page from '../../models/Page.model.js';
import manifestStore from "../../stores/Manifest.store.js";
import definitionStore from "../../stores/Definition.store.js";
import boardStore from "../../stores/Board.store.js";
import scenarioManifestSelectRule from "../../lists/tables/scenarioManifestSelect.rule";


export default new Page('/session/lobby', (initialVnode) => {
    const { loadScenarioManifestRegistry } = manifestStore;
    const { setActiveScenarioDefinition } = definitionStore;
    loadScenarioManifestRegistry().then(() => m.redraw());


    let selectedScenario = undefined;

    const handleSelectScenario = (manifest) => {
        selectedScenario = manifest;
    }

    const handleBack = () => {
        m.route.set('/session')
    }

    const handleStartBattle = async (manifest) => {
        if (selectedScenario) {
            await setActiveScenarioDefinition(manifest);
            boardStore.resetBoard()
            m.route.set('/scenario');
        }
    }

    return {
        view: (vNode) => {
            const { manifestRegistryList } = manifestStore;


            return m(LobbyLayout, [
                m(Table, {
                    data: manifestRegistryList,
                    rules: scenarioManifestSelectRule,
                    dataKey: 'UUID',
                    thClassName: 'first:pl-[7vw]',
                    tbodyClassName: 'max-h-[58vh] overflow-auto',
                    trClassName: 'hover:bg-secondary',
                    tdClassName: 'first:pl-[7vw]',
                    classNamesByKey: selectedScenario && {
                        [selectedScenario.UUID]: '!bg-secondary',
                    },
                    onRowClick: handleSelectScenario,
                }),
                m('div', {className: 'flex justify-between pt-12 px-[7vw]'}, [
                    m(Button, {onclick: handleBack}, 'Back'),
                    m(Button, {onclick: () => handleStartBattle(selectedScenario), disabled: !selectedScenario}, 'Start')
                ])
            ])
        }
    }
})