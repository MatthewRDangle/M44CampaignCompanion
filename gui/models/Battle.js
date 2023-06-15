import Tile from "./Tile";
import Report from "./Report";
import ScenarioDefinitionStore from "../stores/ScenarioDefinition.store";


export default class Battle {
    constructor(tile) {
        this.id = undefined;
        this.tile = tile;
        this.factions = [];
        this.units = [];

        this.reviewed = false;
        this.report = new Report(tile);
    }

    get activeScenario() {
        return ScenarioDefinitionStore.activeScenarioDefinition;
    }

    calculate() {
        this.factions.forEach((faction) => {
            this.report.addOriginFaction(faction);
        })
        this.units.forEach((unit) => {
            this.report.addOriginFaction(unit);
        })
    }

    setTile(tile) {
        if (tile instanceof Tile) {
            this.tile = tile;
        } else {
            console.warn('tile was unable to be added to battle.')
        }
    }

    unitsByFaction(factionName) {
        return this.units.map((unit) => {
            if (unit.faction.name === factionName)
                return unit;
        })
    }

    completeReviewReport() {
        this.reviewed = true;
    }
}