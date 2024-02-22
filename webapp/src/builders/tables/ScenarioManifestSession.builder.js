import TableBuilder from "../../models/Table.builder";

const ScenarioManifestSessionTableController = new TableBuilder();
ScenarioManifestSessionTableController.handle('scenario','Scenario')
ScenarioManifestSessionTableController.handle('factions','Factions')
ScenarioManifestSessionTableController.handle('size','Size')

export default ScenarioManifestSessionTableController;