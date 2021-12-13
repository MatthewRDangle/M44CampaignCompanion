import Faction from './faction.js';
import PGUI from "./gui/pgui.js";

export default class Unit {
    constructor(owner) {
        if ( !(owner instanceof Faction) )
            throw Error('A unit must be assigned to a faction.');

        this.name = 'Unit';
        this.faction = owner;

        this.pgui = undefined;
        this.tile = undefined;
    }

    draw() {
        this.pgui = new PGUI();
    }

    erase() {
        const pgui = this.pgui;
        if (pgui)
            this.pgui.destroy();
    }

    moveTo(tile) {
        if (this.tile)
            tile.removeUnit();
        tile.addUnit(this);
    }
}