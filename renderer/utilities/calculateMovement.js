import DefinitionStore from "../stores/Definition.store.js";
import Unit from "../models/scenario/Unit.model.js";
import Tile from "../models/scenario/Tile.model.js";
import ScenarioDefinitionStore from "../stores/Definition.store.js";
import { createEligibleMove } from "../factories/moves.factory.js";

// TODO Optimize this function at some point.
export const findEligibleMoves = (units) => {
    let eligibleMoves = {}
    if (Array.isArray(units) && units.length) {
        if (units.length === 1)
            eligibleMoves = calculateCostToMoveOneUnit(units[0])
        else
            eligibleMoves = calculateCostToMoveMultipleUnits(units)
    } else if (units instanceof Unit) {
        eligibleMoves = calculateCostToMoveOneUnit(units)
    }

    Object.keys({...eligibleMoves}).forEach((key) => {
        const tile = ScenarioDefinitionStore.activeScenarioDefinition.fetchTileReferenceById(key)
        if (tile.isHostile)
            delete eligibleMoves[key]
    })

    return eligibleMoves
}

// TODO Optimize this function at some point.
export const calculateCostToMoveOneUnit = (unit) => {
    if (!(unit instanceof Unit)) return

    const activeScenario = DefinitionStore.activeScenarioDefinition
    const eligibleMoves = {}
    if (unit.tile instanceof Tile) {
        deepLoopThroughAdjacentTiles(unit.tile, unit, 0, [])
        function deepLoopThroughAdjacentTiles(fromTile, unit, recursiveCost, path) {
            fromTile.adjacentTiles.forEach((toTileId) => {
                const toTile = activeScenario.fetchTileReferenceById(toTileId)

                // Check if tile is not the same as the location of the existing unit.
                if (toTile && toTileId !== unit.tile.id) {

                    // Calculate the cost to enter the adjacent tile, if it's accessible.
                    if (canUnitEnterTile(toTile, unit)) {
                        const cost = costToMoveToAdjacentTile(toTile, unit)
                        const newRecursiveCost = recursiveCost + cost;

                        // Check if the cost to move is greater or equal to than an existing cost to move.
                        // If it's not, replace it and then check adjacent tiles if there is still movement available.
                        if (!eligibleMoves[toTileId] || newRecursiveCost < eligibleMoves[toTileId].cost) {
                            const newPath = [...path, fromTile.id];
                            if (newRecursiveCost <= unit.available_movement)
                                eligibleMoves[toTileId] = createEligibleMove(toTile, unit, newRecursiveCost, newPath)
                            if (newRecursiveCost < unit.available_movement)
                                deepLoopThroughAdjacentTiles(toTile, unit, newRecursiveCost, newPath)
                        }
                    }
                }
            })
        }
    }

    return eligibleMoves
}

// TODO Optimize this function at some point.
export const calculateCostToMoveMultipleUnits = (units) => {
    if (Array.isArray(units)) {
        const allEligibleMoves = {}
        units.forEach(unit => {
            const eligibleMoves = calculateCostToMoveOneUnit(unit)
            Object.entries(eligibleMoves).forEach(([tileId, move]) => {
                if (!allEligibleMoves[tileId]) allEligibleMoves[tileId] = []
                allEligibleMoves[tileId].push(move)
            })
        })

        // Find tiles that every unit is capable of moving to, and insert the object into here.
        const canMoveTo = {}
        Object.entries(allEligibleMoves).forEach(([tileId, moves]) => {
            if (moves.length === units.length)
                canMoveTo[tileId] = moves
        })

        return canMoveTo // An object with a tileId as the key, and an array of moves.
    }

    return {}
}

export const costToMoveToAdjacentTile = (tile, unit) => {
    if (!(tile instanceof Tile) || !(unit instanceof Unit) || !tile.terrain || !tile.terrain.movement_cost || !tile.terrain.render)
        return undefined

    const baseMovementCost = tile.terrain.movement_cost;
    const modifierMovementCost = tile.terrain.movement_cost_modifiers_by_type[unit.type] ?? 0
    return baseMovementCost + modifierMovementCost
}

export const canUnitEnterTile = (tile, unit) => {

    // Check if the tile has room for more units.
    if (!isNaN(tile.terrain.max_units_allowed) && tile.terrain.max_units_allowed <= tile.totalUnitCount)
        return false
    else if (!isNaN(tile.terrain.max_units_allowed_per_faction) && tile.terrain.max_units_allowed_per_faction <= tile.units[unit.faction.name]?.length)
        return false

    // Check if terrain is accessible by this unit type.
    if (!!tile.terrain?.inaccessible_by.includes(unit.type))
        return false

    return true
}