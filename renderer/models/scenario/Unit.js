import Faction from './Faction.js';
import Tile from "./Tile.js";
import Terrain from "./Terrain.js";
import ScenarioDefinitionStore from "../../stores/ScenarioDefinition.store.js";


export default class Unit {
    constructor(owner, options) {
        if ( !(owner instanceof Faction) )
            throw Error('A unit must be assigned to a faction.');

        this.name = options?.name || 'Unit';
        this.type = options?.type || '';
        this.health = options?.health || 1;
        this.tile = undefined;
        this.faction = owner;

        this.canIndirectTo = [];
        this.canMoveTo = {};

        this.icon = {
            src: options?.icon?.src ?? undefined,
            alt: options?.icon?.alt ?? undefined
        };

        // TODO convert to movement object.
        this.available_movement = options?.available_movement || 1;
        this.movement_cap = options?.movement_cap || 1;

        this.attack = {
            direct: options?.direct || true,
            indirect: options?.indirect ? {
                operational: true,
                type: options?.indirect?.type || [],
                range: options?.indirect?.range || 1,
                damage: options?.indirect?.damage || 1,
                chance: options?.indirect?.chance || 25,
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
        return this.available_movement <= 0; // TODO if not 0, check if there are any eligible moves to be made.
    }

    get isSelected() {
        return this.activeScenario.selectedUnit === this
    }

    attachTile(tile) {
        if (tile instanceof Tile)
            this.tile = tile;
    }

    calculateEligibleMoves() {
        const activeScenario = this.activeScenario;
        const eligible_moves = {};
        const unitTileId = this.tile.id;
        const unitOwner = this.faction;
        const unitType = this.type;
        if (this.tile instanceof Tile)
            checkMovement(this.tile, this.available_movement);

        this.canMoveTo = eligible_moves;
        return eligible_moves; // All eligible moves w/ remaining movement after moving.


        function checkMovement(tile, available_movement) {
            if (tile.isContested)
                return

            let movement_info = tile.adjacentMovementCost();
            for (let tileId in movement_info) {
                const movement_cost = movement_info[tileId];
                if ( movement_cost <= available_movement) {
                    const [row] = tileId.split('-');
                    const adjTile = activeScenario.tiles[row][tileId];

                    // Check if the tile has room for more units.
                    if (!isNaN(adjTile.terrain.max_units_allowed) && adjTile.terrain.max_units_allowed <= adjTile.totalUnitCount)
                        continue
                    else if (!isNaN(adjTile.terrain.max_units_allowed_per_faction) && adjTile.terrain.max_units_allowed_per_faction <= adjTile.units[unitOwner.name]?.length)
                        continue

                    // Check if terrain is accessible by this unit type.
                    if (!!adjTile.terrain?.inaccessible_by.includes(unitType))
                        continue

                    // Apply movement modifiers.
                    let remaining_movement = available_movement - movement_cost;
                    if (adjTile.terrain instanceof Terrain && !!adjTile.terrain?.movement_cost_modifiers_by_type[unitType]) {
                        remaining_movement = remaining_movement - adjTile.terrain?.movement_cost_modifiers_by_type[unitType];
                        if (remaining_movement < 0)
                            continue
                    }

                    // Only add tile if it not the current unit tile.
                    if (unitTileId !== tileId) {

                        // Check if tile already exists. If it does overwrite it if the new route has the highest available_movement remaining.
                        if (eligible_moves.hasOwnProperty(tileId) && eligible_moves[tileId] < remaining_movement && unitTileId)
                            eligible_moves[tileId] = remaining_movement;

                        // If it doesn't exist, add it.
                        else if (!eligible_moves.hasOwnProperty(tileId))
                            eligible_moves[tileId] = remaining_movement;

                        // Otherwise skip, because it shouldn't be added since it's a smaller number.
                        else
                            continue
                    }

                    // If there is any available movement left, repeat; unless it's an enemy unit is preventing movement.
                    if (remaining_movement > 0) {
                        if (row > 0 && (adjTile.occupied_by === unitOwner || adjTile.occupied_by === undefined)) {
                            checkMovement(adjTile, remaining_movement);
                        }
                    }
                }
            }
        }
    }

    calculateEligableIndirectAttackTiles() {
        const eligableTiles = []
        if (!this.canAttackIndirectly)
            return eligableTiles

        const currentTile = this.tile;
        const range = this.attack.indirect.range;
        const activeScenario = this.activeScenario;
        checkTile(this.tile, range);
        this.canIndirectTo = eligableTiles;
        return eligableTiles

        // TODO This function is poorly optimized. Fix when moving to store.
        function checkTile(tile, localRange) {
            if (tile && !!tile?.terrain?.render) {
                if (tile !== currentTile && !eligableTiles.includes(tile) && tile.isHostile)
                    eligableTiles.push(tile)

                if (localRange - 1 >= 0) {
                    tile.adjacentTiles.forEach(adjTileId => {
                        const [row] = adjTileId.split('-')
                        if (row > 0 && row <= activeScenario.rows) {
                            const tile = activeScenario.tiles[row][adjTileId]
                            checkTile(tile, localRange - 1);
                        }
                    })
                }
            }
        }
    }

    damage(int) {
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
        if (this.isSelected) this.activeScenario.selectUnit()
        this.tile.removeUnit(this);
    }

    detachTile() {
        this.tile = undefined;
    }

    deselect() {
        this.canMoveTo = {};
        if (this.activeScenario.selectedUnit instanceof Unit && this.activeScenario.selectedUnit === this)
            this.activeScenario.selectUnit()
    }

    exhaust() {
        this.available_movement = 0;
    }

    heal(int) {
        int = Math.abs(int);
        this.health += int;
    }

    indirectAttack(tile) {
        if (this.canAttackIndirectly && this.canIndirectTo.includes(tile)) {
            const attack = this.attack.indirect;
            tile.defendAgainstIndirectAttack(attack);
            this.exhaust();
        }
    }

    move(tile) {
        if (this.tile) {
            const eligibleMoves = this.canMoveTo;
            for(let key in eligibleMoves) {
                const new_available_movement = eligibleMoves[key];
                if (tile.id === key && this.available_movement >= new_available_movement) {
                    this.warp(tile);
                    this.activeScenario.trackUnitMoved(this);
                    this.deselect();
                    this.available_movement = new_available_movement;

                    if (tile.occupied_by !== this.faction)
                        tile.contest();
                }
            }
        }
    }

    replenish() {
        this.available_movement = this.movement_cap;
    }

    select() {
        if (this.activeScenario.selectedUnit instanceof Unit && this.activeScenario.selectedUnit !== this)
            this.activeScenario.selectedUnit.deselect();
        this.activeScenario.selectUnit(this);
    }

    warp(tile) {
        if (tile instanceof Tile && tile !== this.tile) {
            this.tile.removeUnit(this);
            tile.addUnit(this);
        }
    }
}