import PGUI from "../pgui.js";

export default class Tile extends PGUI {
    constructor(scene, map) {
        super(scene);
        this.map = map || undefined;

        // Ownership & Contest
        this.owner = undefined;
        this.isContested = false;

        // Terrain, Overlay, Units & Fortifications
        this.terrain = undefined;
        this.overlay = undefined;
        this.units = [];

        // Create Default Hex
        this.width = 24 * 3;
        this.height = 20 * 3;
        this.backgroundShape = 'hex';
        this.backgroundColor = '0xC5D6B7';
    }

    contest() {}

    addUnit(unit) {
        if (unit instanceof Unit) {
            this.units.push(unit);
        }
    }

    removeUnit(unit) {
        if (unit instanceof Unit) {
            let idx = this.units.indexOf(unit)
            if (idx >= 0) {
                this.units.splice(idx, 1);
            }
        }
    }

    setTerrain() {}
    setOverlay() {}
    setOwner() {}
}