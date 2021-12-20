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
        this.state.width = 20 * 10;
        this.state.height = 14 * 10;
        this.state.textColor = '0x000000';
        this.state.backgroundShape = 'hex';
        this.state.backgroundColor = '0xD2E2BB';
    }

    contest() {}

    addUnit(unit) {
        if (unit instanceof Unit) {
            let units = [...this.state.units];
            units.push(unit);
            this.setState(unit);
            if (!unit.pgui)
                unit.draw(this.state.scene);
            this.addChild(unit.pgui);
        }
    }

    deselect() {
        localData.navigate('selected_tile').setValue(undefined);
        this.setState('backgroundColor', '0xD2E2BB');
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
        var test = localData.navigate('selected_tile')
        test.setValue(this);
        this.setState('backgroundColor', '0xDBBD77');
    }

    setTerrain() {}
    setOverlay() {}
    setOwner() {}
}