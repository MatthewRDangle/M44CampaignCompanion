import Faction from './Faction.js';
import Tile from "./Tile.js";
import Terrain from "./Terrain.js";
import ScenarioDefinitionStore from "../../stores/ScenarioDefinition.store.js";


export default class Unit {

    constructor(owner, options) {
        if ( !(owner instanceof Faction) )
            throw Error('A unit must be assigned to a faction.');

        this.faction = owner;
        this.isSelected = false;
        this.name = options?.name || 'Unit';
        this.type = options?.type || '';
        this.health = options?.health || 1;
        this.icon = {
            src: options?.icon?.src ?? undefined,
            alt: options?.icon?.alt ?? undefined
        };

        this.available_movement = options?.available_movement || 1;
        this.movement_cap = options?.movement_cap || 1;
        this.canMoveTo = {};

        this.tile = undefined;
    }

    get activeScenario() {
        return ScenarioDefinitionStore.activeScenarioDefinition;
    }

    get isExhausted() {
        // TODO if not 0, check if there are any eligible moves to be made.
        return this.available_movement <= 0;
    }


    attachTile(tile) {
        if (tile instanceof Tile)
            this.tile = tile;
    }

    eligibleMoves() {
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

    death() {
        if (this.activeScenario.selectedUnit === this)
            this.activeScenario.selectedUnit = undefined;
        this.tile.removeUnit(this);
    }

    decreaseHealthBy(int) {
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

    detachTile() {
        this.tile = undefined;
    }

    deselect() {
        this.isSelected = false;
        this.canMoveTo = {};
        if (this.activeScenario.selectedUnit instanceof Unit && this.activeScenario.selectedUnit === this)
            this.activeScenario.selectedUnit = undefined;
    }

    exhaust() {
        this.available_movement = 0;
    }

    increaseHealthBy(int) {
        int = Math.abs(int);
        this.health += int;
    }

    moveTo(tile) {
        if (this.tile) {
            const eligibleMoves = this.canMoveTo;
            for(let key in eligibleMoves) {
                const new_available_movement = eligibleMoves[key];
                if (tile.id === key && this.available_movement >= new_available_movement) {
                    this.warpTo(tile);
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
        this.isSelected = true;
        this.eligibleMoves();
        if (this.activeScenario.selectedUnit instanceof Unit && this.activeScenario.selectedUnit !== this)
            this.activeScenario.selectedUnit.deselect();
        this.activeScenario.selectedUnit = this;
    }

    warpTo(tile) {
        if (tile instanceof Tile && tile !== this.tile) {
            this.tile.removeUnit(this);
            tile.addUnit(this);
        }
    }
}