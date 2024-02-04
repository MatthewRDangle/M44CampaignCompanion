import ScenarioDefinitionStore from "../../stores/Definition.store.js";


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
        const attackerReachedNetZero = checkAllFactionsUnitsWillBeDestroyed(this.attackingUnitsInitialHealth, this.attackingUnitHealthChange);
        const defenderReachedNetZero = checkAllFactionsUnitsWillBeDestroyed(this.defendingUnitsInitialHealth, this.defendingUnitHealthChange);

        // Apply Change to units, otherwise notify user the battle can't resolve.
        if (attackerReachedNetZero || defenderReachedNetZero) {
            changeUnitsHealth(this.attackingUnitHealthChange, this.attackingUnits);
            changeUnitsHealth(this.defendingUnitHealthChange, this.defendingUnits);
            this.attackingUnitHealthChange = {};
            this.defendingUnitHealthChange = {};
        } else {
            alert('One side must have no units remaining before this battle can resolve.')
        }


        function checkAllFactionsUnitsWillBeDestroyed(intialHealthObj, changehealthObj) {
            for (let groupBy in intialHealthObj) {
                if (intialHealthObj[groupBy] + changehealthObj[groupBy] !== 0)
                    return false
            }
            return true
        }

        function changeUnitsHealth(changeObj, unitGroupByObj = []) {
            Object.entries({...changeObj}).forEach(([groupBy, groupByHealthChange]) => {
                let remainingHealthChange = groupByHealthChange;
                const unitArray = [...unitGroupByObj[groupBy]];
                for (let idx = 0; idx < unitArray.length; idx++) {
                    let unit = unitArray[idx];
                    if (remainingHealthChange < 0) {
                        remainingHealthChange = 0 - unit.hurt(remainingHealthChange)
                    } else if (remainingHealthChange > 0) {
                        unit.heal(remainingHealthChange)
                        remainingHealthChange = 0;
                    } else {
                        break;
                    }
                }
            })
        }
    }
}