import Faction from './Faction.model.js';
import Tile from "./Tile.model.js";
import ScenarioDefinitionStore from "../../stores/Definition.store.js";
import modeStore from "../../stores/Mode.store.js";


export default class Unit {
    constructor(owner, options) {
        if ( !(owner instanceof Faction) )
            throw Error('A unit must be assigned to a faction.');

        this.name = options?.name || 'Unit';
        this.type = options?.type || '';
        this.health = options?.health || 1;
        this.tile = undefined;
        this.faction = owner;

        this.icon = {
            src: options?.icon?.src ?? undefined,
            alt: options?.icon?.alt ?? undefined
        };

        // TODO convert to movement object.
        this.available_movement = options?.available_movement || 1;
        this.movement_cap = options?.movement_cap || 1;

        this.attack = { // TODO change name to arsenal
            direct: options?.direct_attack || true,
            indirect: !!options?.indirect_attack ? {
                operational: true,
                type: options?.indirect_attack?.type || [],
                range: options?.indirect_attack?.range || 1,
                damage: options?.indirect_attack?.damage || 1,
                chance: options?.indirect_attack?.chance || 25,
            } : false,
        }
    }

    get activeScenario() {
        return ScenarioDefinitionStore.activeScenarioDefinition;
    }

    get canAttackDirectly() {
        return this.attack.direct;
    }

    get canAttackIndirectly() {
        if (!!this.attack.indirect && !this.isExhausted)
            return this.attack.indirect.operational
        return false
    }

    get isExhausted() {
        // TODO if not 0, check if there are any eligible moves to be made.
        return this.available_movement <= 0;
    }

    get isSelected() {
        return modeStore.selectedUnits.includes(this)
    }

    attachTile(tile) {
        if (tile instanceof Tile)
            this.tile = tile;
    }

    hurt(int) {
        int = Math.abs(int);

        if (int < this.health) {
            this.health -= int;
            return 0;
        }
        else {
            const preHealth = this.health;
            this.death();
            return int - preHealth;
        }
    }

    death() {
        if (this.isSelected) modeStore.deselectUnit(this)
        this.tile.removeUnit(this);
    }

    detachTile() {
        this.tile = undefined;
    }

    deselect() {
        modeStore.deselectUnit(this)
    }

    exhaust() {
        this.available_movement = 0;
    }

    heal(int) {
        int = Math.abs(int);
        this.health += int;
    }

    directAttack(tile, cost) {
        if ( this.canAttackDirectly && this.move(tile, cost) ) {
            this.exhaust()
            this.deselect()
        }
    }

    indirectAttack(tile) {
        if (this.canAttackIndirectly && tile instanceof Tile) {
            const attack = this.attack.indirect;
            tile.protect(attack);
            this.activeScenario.trackUnitMoved(this);
            this.exhaust();
            this.deselect();
        }
    }

    move(tile, cost) {
        if (tile && cost && this.available_movement >= cost) {
            this.warp(tile);
            this.activeScenario.trackUnitMoved(this);
            this.deselect();
            this.available_movement = this.available_movement - cost;

            if (tile.occupied_by !== this.faction)
                tile.contest();

            return true
        }

        return false
    }

    replenish() {
        this.available_movement = this.movement_cap;
    }

    select() {
        modeStore.selectUnit(this)
    }

    warp(tile) {
        if (tile instanceof Tile && tile !== this.tile) {
            this.tile.removeUnit(this);
            tile.addUnit(this);
        }
    }
}