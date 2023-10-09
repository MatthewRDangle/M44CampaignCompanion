import Unit from "../models/scenario/Unit.model.js";
import Tile from "../models/scenario/Tile.model.js";
import Terrain from "../models/scenario/Terrain.model.js";
import DefinitionStore from "../stores/Definition.store.js";

// TODO Abstract this into JS factory pattern.
export function createMovementCostsForOneUnit (unit) {
    if (!(unit instanceof Unit)) return

    const activeScenario = DefinitionStore.activeScenarioDefinition
    const eligibleMoves = {};
    const unitTileId = unit.tile.id;
    const unitOwner = unit.faction;
    const unitType = unit.type;
    if (unit.tile instanceof Tile)
        findWhereCanUnitMoveTo(unit.tile, unit.available_movement);

    function findWhereCanUnitMoveTo (tile, availableMovement) {
        if (!(tile instanceof Tile) || isNaN(availableMovement)) return
        if (tile.isContested) return

        let movement_info = tile.adjacentMovementCost();
        for (let tileId in movement_info) {
            const movement_cost = movement_info[tileId];
            if (movement_cost <= availableMovement) {
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
                let remaining_movement = availableMovement - movement_cost;
                if (adjTile.terrain instanceof Terrain && !!adjTile.terrain?.movement_cost_modifiers_by_type[unitType]) {
                    remaining_movement = remaining_movement - adjTile.terrain?.movement_cost_modifiers_by_type[unitType];
                    if (remaining_movement < 0)
                        continue
                }

                // Only add tile if it not the current unit tile.
                if (unitTileId !== tileId) {

                    // Check if tile already exists. If it does overwrite it if the new route has the highest available movement remaining.
                    if (eligibleMoves.hasOwnProperty(tileId) && eligibleMoves[tileId] < remaining_movement && unitTileId)
                        eligibleMoves[tileId] = remaining_movement;

                    // If it doesn't exist, add it.
                    else if (!eligibleMoves.hasOwnProperty(tileId))
                        eligibleMoves[tileId] = remaining_movement;

                    // Otherwise skip, because it shouldn't be added since it's a smaller number.
                    else
                        continue
                }

                // If there is any available movement left, repeat; unless it's an enemy unit is preventing movement.
                if (remaining_movement > 0) {
                    if (row > 0 && (adjTile.occupied_by === unitOwner || adjTile.occupied_by === undefined)) {
                        findWhereCanUnitMoveTo(adjTile, remaining_movement);
                    }
                }
            }
        }
    }

    return eligibleMoves;
}