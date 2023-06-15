import ScenarioDefinitionStore from "../../stores/ScenarioDefinition.store.js";


export default class Battle {
    tile = undefined;
    contestedOnTurn = 1;
    attackingUnitHealthChange = {};
    defendingUnitHealthChange = {};

    constructor(tile) {
        this.tile = tile;
        this.contestedOnTurn = this.activeScenario.turnCounter;
    }

    get activeScenario() {
        return ScenarioDefinitionStore.activeScenarioDefinition;
    }

    get attackingFaction() {
        return this.tile.isContested;
    }

    get attackingUnits() {
        return Object.values(this.tile.units[this.attackingFaction.name]).reduce((prev, unit) => {
            const groupBy = unit.name;
            if (!prev[groupBy])
                prev[groupBy] = [];
            prev[groupBy].push(unit);
            return prev;
        }, {});
    }

    get attackingUnitsInitialHealth() {
        let tmpUnitsInitialHealth = {}
        Object.entries(this.attackingUnits).forEach(([groupBy, units]) => {
            tmpUnitsInitialHealth[groupBy] = units.reduce((prev, unit) => (prev += unit.health), 0);
        })

        return tmpUnitsInitialHealth
    }

    get defendingFaction() {
        return this.tile.occupied_by;
    }

    get defendingUnits() {
        return Object.values(this.tile.units[this.defendingFaction.name]).reduce((prev, unit) => {
            const groupBy = unit.name;
            if (!prev[groupBy])
                prev[groupBy] = [];
            prev[groupBy].push(unit);
            return prev;
        }, {});
    }

    get defendingUnitsInitialHealth() {
        let tmpUnitsInitialHealth = {}
        Object.entries(this.defendingUnits).forEach(([groupBy, units]) => {
            tmpUnitsInitialHealth[groupBy] = units.reduce((prev, unit) => (prev += unit.health), 0);
        })

        return tmpUnitsInitialHealth
    }

    changeAttackingUnitHealthTo(groupBy, newHealth) {
        const initialHealth = this.attackingUnitsInitialHealth[groupBy];
        this.attackingUnitHealthChange[groupBy] = newHealth - initialHealth;
    }

    changeDefendingUnitHealthTo(groupBy, newHealth) {
        const initialHealth = this.defendingUnitsInitialHealth[groupBy];
        this.defendingUnitHealthChange[groupBy] = newHealth - initialHealth;
    }

    finalizeChanges() {
        const tmpAttackingUnitHealthChange = {...this.attackingUnitHealthChange};
        Object.entries(tmpAttackingUnitHealthChange).forEach(([groupBy, groupByHealthChange]) => {
            let remainingHealthChange = groupByHealthChange;
            const unitGroup = this.attackingUnits[groupBy];
            if (unitGroup) {
                unitGroup.forEach(unit => {
                    if (remainingHealthChange < 0)
                        remainingHealthChange = unit.decreaseHealth(remainingHealthChange)
                    else if (remainingHealthChange > 0) {
                        unit.increaseHealth(remainingHealthChange)
                        remainingHealthChange = 0;
                    }
                })
            }
        })
        const tmpDefendingUnitHealthChange = {...this.defendingUnitHealthChange};
        Object.entries(tmpDefendingUnitHealthChange).forEach(([groupBy, groupByHealthChange]) => {
            let remainingHealthChange = groupByHealthChange;
            const unitGroup = this.defendingUnits[groupBy];
            if (unitGroup) {
                unitGroup.forEach(unit => {
                    if (remainingHealthChange < 0)
                        remainingHealthChange = unit.decreaseHealth(remainingHealthChange)
                    else if (remainingHealthChange > 0) {
                        unit.increaseHealth(remainingHealthChange)
                        remainingHealthChange = 0;
                    }
                })
            }
        })

        this.attackingUnitHealthChange = {};
        this.defendingUnitHealthChange = {};
    }
}