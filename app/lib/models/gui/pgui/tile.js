import PGUI from "../pgui.js";
import Unit from "../../unit.js";
import {localData} from '../../../../localdata.js';

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
        this.state.backgroundColor = '0xD2E2BB';
    }

    contest() {}

    addUnit(unit) {
        if (unit instanceof Unit) {
            let units = {...this.state.units};
            units.push(unit);
            this.setState(unit);
            if (!unit.pgui)
                unit.draw();
            this.addChild(unit.pgui);
        }
    }

    deselect() {
        localData.navigate('selected_tile').setValue(undefined);
    }

    removeUnit(unit) {
        if (unit instanceof Unit) {
            let state = this.state;
            let idx = state.units.indexOf(unit);
            if (idx >= 0) {
                let units = {...state.units};
                units.splice(idx, 1);
                this.setState('units', units);
                this.removeChild(unit.pgui);
            }
        }
    }

    select() {
        localData.navigate('selected_tile').setValue(this);
    }

    setTerrain() {}
    setOverlay() {}
    setOwner() {}
}