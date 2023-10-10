import Unit from "../models/scenario/Unit.model.js";
import Tile from "../models/scenario/Tile.model.js";
import { findAllAttackOpportunities } from "../factories/attacks.factory.js";
import { calculateCostToMoveMultipleUnits } from "../utilities/calculateMovement.js";

let modeStore;

class ModeStore {
    selectedUnits = []
    selectedTile = undefined
    possibleMoves = undefined
    possibleDirectAttacks = undefined
    possibleIndirectAttacks = undefined

    constructor() {
        if (!modeStore) {
            this.enableCommandMode = this.enableCommandMode.bind(this);
            this.enableMovementMode = this.enableMovementMode.bind(this);
            this.enableDirectAttackMode = this.enableDirectAttackMode.bind(this);
            this.disableIndirectFireMode = this.disableIndirectFireMode.bind(this);
            this.selectUnit = this.selectUnit.bind(this);
            this.selectMultipleUnits = this.selectMultipleUnits.bind(this);
            this.deselectUnit = this.deselectUnit.bind(this);
            this.deselectMultipleUnits = this.deselectMultipleUnits.bind(this);
            this.deselectAllUnits = this.deselectAllUnits.bind(this);
            this.selectTile = this.selectTile.bind(this);
            this.deselectTile = this.deselectTile.bind(this);
            return this;
        } else
            return modeStore;
    }

    get unitsAreSelected() {
        return this.selectedUnits.length > 0
    }

    get isCommandMode() {
        return !this.isMovementMode && !this.isDirectAttackMode && !this.isIndirectFireMode

    }

    get isMovementMode() {
        return this.unitsAreSelected && this.possibleMoves
    }

    get isDirectAttackMode() {
        return this.unitsAreSelected && this.possibleDirectAttacks
    }

    get isIndirectFireMode() {
        return this.unitsAreSelected && this.possibleIndirectAttacks
    }

    enableCommandMode() {
        this.deselectAllUnits()
        this.disableMovementMode()
        this.disableDirectAttackMode()
        this.disableIndirectFireMode()
    }

    enableMovementMode() {
        if (this.unitsAreSelected) {
            this.disableDirectAttackMode()
            this.disableIndirectFireMode()
            this.possibleMoves = calculateCostToMoveMultipleUnits(this.selectedUnits)
        }
    }

    enableDirectAttackMode() {
        if (this.unitsAreSelected) {
            this.disableMovementMode()
            this.disableIndirectFireMode()
            this.possibleDirectAttacks = findAllAttackOpportunities(this.selectedUnits)
        }
    }

    enableIndirectFireMode() {
        if (this.unitsAreSelected) {
            this.disableMovementMode()
            this.disableDirectAttackMode()
            this.possibleIndirectAttacks = findAllAttackOpportunities(this.selectedUnits)
        }
    }

    disableMovementMode() {
        this.possibleMoves = undefined
    }

    disableDirectAttackMode() {
        this.possibleDirectAttacks = undefined
    }

    disableIndirectFireMode() {
        this.possibleIndirectAttacks = undefined
    }

    selectUnit(unit) {
        this.disableMovementMode()
        this.disableDirectAttackMode()
        this.disableIndirectFireMode()
        if (unit instanceof Unit && !this.selectedUnits.includes(unit))
            this.selectedUnits.push(unit)
    }

    selectMultipleUnits(units) {
        if (!Array.isArray(units)) return
        units.forEach((unit) => {
            if (!this.selectedUnits.includes(unit))
                this.selectUnit(unit)
        })
    }

    hasSelectedUnit(unit) {
        return !!this.selectedUnits.includes(unit)
    }

    deselectUnit(unit) {
        this.disableMovementMode()
        this.disableDirectAttackMode()
        this.disableIndirectFireMode()
        if (unit instanceof Unit) {
            const idx = this.selectedUnits.indexOf(unit);
            if (idx >= 0) this.selectedUnits.splice(idx, 1)
        }
    }

    deselectAllUnits() {
        this.selectedUnits.length = 0
    }

    deselectMultipleUnits(units) {
        if (!Array.isArray(units)) return
        units.forEach((unit) => {
            this.deselectUnit(unit)
        })
    }

    selectTile(tile) {
        if (tile instanceof Tile)
            this.selectedTile = tile;
    }

    deselectTile() {
        this.selectedTile = undefined;
    }
}

modeStore = new ModeStore();
export default modeStore;