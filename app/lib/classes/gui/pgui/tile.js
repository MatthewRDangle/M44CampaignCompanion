const m = require('mithril');
import PGUI from "../pgui.js";
import Unit from "../../unit.js";
import Terrain from "../../terrain.js";
import {localData} from '../../../../localdata.js';

export default class Tile extends PGUI {
    constructor(scene, map) {
        super(scene);
        this.state.map = map || undefined;
        this.state.isSelected = false;

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

        // Relative Positioning.
        this.adjacentTiles = [];
    }

    addUnit(unit) {
        if (unit instanceof Unit) {
            let units = [...this.state.units];
            units.push(unit);
            this.setState('units', units);
            unit.tile = this;
            if (!unit.pgui)
                unit.draw(this.state.scene);
            this.addChild(unit.pgui);

            if (this.state.owner !== unit.faction) {
                const owner_name = (this.state.owner) ? this.state.owner.name : '?';
                const owner_units_array = this.getChildrenByTag(owner_name);
                if (!owner_units_array || owner_units_array.length <= 0)
                    this.setState('owner', unit.faction);
            }

            const map = localData.getValue('gameboard');
            const selected_tile = localData.getValue('selected_tile');
            map.onTileSelect(selected_tile);
        }
    }

    adjacentMovementCost() {
        const scene = localData.getValue('scene');
        const movement_info = {};
        this.adjacentTiles.forEach(function (tileid) {
            const tile = scene.getChildByID(tileid);
            if (tile)
                movement_info[tileid] = tile.state.terrain.movement_cost;
        });
        return movement_info;
    }

    battle() {
        m.route.set('/battle');
    }

    contest() {
        this.setState({
            'backgroundColor': '0xF38463',
            'isContested': true
        });
    }

    deselect() {
        localData.navigate('selected_tile').setValue(undefined);
        if (this.state.isContested)
            this.setState('backgroundColor', '0xF38463');
        else
            this.setState('backgroundColor', '0xD2E2BB');
        this.setState('isSelected', false);
        const map = localData.navigate('gameboard').getValue();
        map.onTileSelect();
    }

    mergeUnit(unit) {
        console.log('merge clicked.');
    }

    preview() {
        m.route.set('/preview');
    }

    removeUnit(unit) {
        if (unit instanceof Unit) {
            let state = this.state;
            let idx = state.units.indexOf(unit);
            if (idx >= 0) {
                let units = [...state.units];
                units.splice(idx, 1);
                this.setState('units', units);
                this.removeChild(unit.pgui);
                unit.tile = undefined;

                const map = localData.getValue('gameboard');
                const selected_tile = localData.getValue('selected_tile');
                map.onTileSelect(selected_tile);
            }
        }
    }

    resolve() {
        this.setState('backgroundColor', '0xD2E2BB');
    }

    revertCommand() {
        console.log('revert clicked.');
    }

    select() {
        localData.navigate('selected_tile').setValue(this);
        this.setState('backgroundColor', '0xDBBD77');
        this.setState('isSelected', true);
        const map = localData.navigate('gameboard').getValue();
        map.onTileSelect(this);
    }

    setTerrain(terrain) {
        if (terrain instanceof Terrain)
            this.setState('terrain', terrain);
    }

    splitUnit(unit) {
        console.log('split clicked.');
    }
}