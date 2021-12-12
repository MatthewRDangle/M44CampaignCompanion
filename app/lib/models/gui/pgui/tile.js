import PGUI from "../pgui.js";

export default class Tile extends PGUI {
    constructor(scene, map) {
        super(scene);
        this.state.map = map || undefined;

        // Ownership & Contest
        this.state.owner = undefined;
        this.state.isContested = false;

        // Terrain, Overlay, Units & Fortifications
        this.state.terrain = undefined;
        this.state.overlay = undefined;
        this.state.units = [];

        // Create Default Hex
        this.state.width = 24 * 3;
        this.state.height = 20 * 3;
        this.state.backgroundShape = 'hex';
        this.state.backgroundColor = '0xC5D6B7';
    }

    contest() {}

    // addUnit(unit) {
    //     if (unit instanceof Unit) {
    //         this.units.push(unit);
    //     }
    // }

    // removeUnit(unit) {
    //     if (unit instanceof Unit) {
    //         let idx = this.units.indexOf(unit)
    //         if (idx >= 0) {
    //             this.units.splice(idx, 1);
    //         }
    //     }
    // }

    setTerrain() {}
    setOverlay() {}
    setOwner() {}
}