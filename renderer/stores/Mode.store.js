import Unit from "../models/scenario/Unit.model.js";
import Tile from "../models/scenario/Tile.model.js";

let modeStore;

class InteractionStore {
    _unitIndirectFire = undefined
    selectedUnit = undefined
    selectedTile = undefined

    constructor() {
        if (!modeStore) {
            this.enableIndirectFireMode = this.enableIndirectFireMode.bind(this);
            this.disableIndirectFireMode = this.disableIndirectFireMode.bind(this);
            this.selectUnit = this.selectUnit.bind(this);
            this.selectTile = this.selectTile.bind(this);
            return this;
        } else
            return modeStore;
    }

    get isCommandMode() {
        return !this.selectedUnit
    }

    get isMoveUnitMode() {
        return !!this.selectedUnit && !this._unitIndirectFire
    }

    get isIndirectFireMode() {
        return !!this.selectedUnit && !!this._unitIndirectFire
    }

    enableIndirectFireMode() {
        if (!!this.selectedUnit) {
            this.selectedUnit.calculateEligableIndirectAttackTiles();
            return this._unitIndirectFire = true
        }
    }

    disableIndirectFireMode() {
        return this._unitIndirectFire = false
    }

    selectUnit(unit) {
        if (unit instanceof Unit) {
            this.selectedUnit = unit;
            unit.calculateEligibleMoves();
        }
        else {
            this.selectedUnit = undefined;
            this._unitIndirectFire = undefined;
        }
    }

    selectTile(tile) {
        if (tile instanceof Tile)
            this.selectedTile = tile;
        else
            this.selectedTile = undefined;
    }
}

modeStore = new InteractionStore();
export default modeStore;