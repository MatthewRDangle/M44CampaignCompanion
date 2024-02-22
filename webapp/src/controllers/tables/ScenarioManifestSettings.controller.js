import TableControllerBuilder from "../../models/TableController.builder";

const ScenarioManifestSessionTableController = new TableControllerBuilder();
ScenarioManifestSessionTableController.handle('scenario','Scenario')
ScenarioManifestSessionTableController.handle('factions','Factions')
ScenarioManifestSessionTableController.handle('size','Size')

export default ScenarioManifestSessionTableController;