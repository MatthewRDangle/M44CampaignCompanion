import Faction from "./Faction";
import Unit from "./Unit";
import Tile from "./Tile";

export default class Report {
    constructor(tile) {
        this.tile = tile;
        this.pre = {
            factions: {},
            units: {},
        };
        this.post = {
            factions: {},
            units: {},
        }
    }

    get origin() {
        return {
            tile: this.tile,
            ...this.pre
        }
    }

    get outcome() {
        return {
            tile: this.tile,
            ...this.post
        }
    }

    addOriginFaction(faction) {
        if (faction instanceof Faction) {
            this.origin.faction[faction.name] = {...faction};
        } else {
            console.warn('faction was unable to be added as origin faction on report.')
        }
    }

    addOriginUnit(unit) {
        if (unit instanceof Unit) {
            this.origin.unit[unit.name] = {...unit};
        } else {
            console.warn('unit was unable to be added as origin unit on report.')
        }
    }

    addOutcomeFaction(faction) {
        if (faction instanceof Faction) {
            this.outcome.faction[faction.name] = {...faction};
        } else {
            console.warn('faction was unable to be added as outcome faction on report.')
        }
    }

    addOutcomeUnit(unit) {
        if (unit instanceof Unit) {
            this.outcome.unit[unit.name] = {...unit};
        } else {
            console.warn('unit was unable to be added as outcome unit on report.')
        }
    }

    compile(definition) {
        // TODO add compile instructions.
    }

    setTile(tile) {
        if (tile instanceof Tile) {
            this.tile = tile;
        } else {
            console.warn('tile was unable to be added on report.')
        }
    }
}