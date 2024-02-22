import Unit from "../models/scenario/Unit.model.js";
import Terrain from "../models/scenario/Terrain.model.js";
import {createEligibleIndirectAttack} from "./attacks.js";
import {calculateCostToMoveMultipleUnits, calculateCostToMoveOneUnit} from "./calculateMovement.js";
import ScenarioDefinitionStore from "../stores/Definition.store.js";

// TODO Optimize this function at some point.
export const findEligibleDirectAttacks = (units) => {
    if (Array.isArray(units) && units.length) {
        if (units.length === 1)
            return calculateCostToDirectAttackForOneUnit(units[0])
        else
            return calculateCostToDirectAttackFromMultipleUnits(units)
    } else if (units instanceof Unit) {
        return calculateCostToDirectAttackForOneUnit(units)
    }
}

// TODO Optimize this function at some point.
export const findEligibleIndirectAttacks = (units) => {
    if (Array.isArray(units) && units.length) {
        if (units.length === 1)
            return calculateDistanceToIndirectAttackForOneUnit(units[0])
        else
            return calculateDistanceToIndirectAttackFromMultipleUnits(units)
    } else if (units instanceof Unit) {
        return calculateDistanceToIndirectAttackForOneUnit(units)
    }
}

// TODO Optimize this function at some point.
export const calculateCostToDirectAttackForOneUnit = (unit) => {
    const eligibleMoves = calculateCostToMoveOneUnit(unit)
    Object.keys({...eligibleMoves}).forEach((key) => {
        const tile = ScenarioDefinitionStore.activeScenarioDefinition.fetchTileReferenceById(key)
        if (!tile.isHostile)
            delete eligibleMoves[key]
    })

    return eligibleMoves
}

// TODO Optimize this function at some point.
export const calculateCostToDirectAttackFromMultipleUnits = (units) => {
    const eligibleMoves = calculateCostToMoveMultipleUnits(units)
    Object.keys({...eligibleMoves}).forEach((key) => {
        const tile = ScenarioDefinitionStore.activeScenarioDefinition.fetchTileReferenceById(key)
        if (!tile.isHostile)
            delete eligibleMoves[key]
    })

    return eligibleMoves
}

// TODO Optimize this function at some point.
export const calculateDistanceToIndirectAttackForOneUnit = (unit) => {
    if (!(unit instanceof Unit)) return

    const eligibleAttacks = {}
    if (!unit.canAttackIndirectly)
        return eligibleAttacks

    const currentTile = unit.tile;
    const range = unit.attack.indirect.range;
    const activeScenario = unit.activeScenario;
    checkTile(unit.tile, range);

    function checkTile(tile, localRange) {
        if (tile && !!tile?.terrain?.render) {
            if (tile !== currentTile && !eligibleAttacks[tile.id] && tile.isHostile)
                eligibleAttacks[tile.id] = createEligibleIndirectAttack(unit, tile)

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

    return eligibleAttacks
}

// TODO Optimize this function at some point.
export const calculateDistanceToIndirectAttackFromMultipleUnits = (units) => {
    if (Array.isArray(units)) {
        const allEligibleAttacks = {}
        units.forEach(unit => {
            const eligibleAttacks = calculateDistanceToIndirectAttackFromMultipleUnits(units)
            Object.entries(eligibleAttacks).forEach(([tileId, attack]) => {
                if (!allEligibleAttacks[tileId]) allEligibleAttacks[tileId] = []
                allEligibleAttacks[tileId].push(attack)
            })
        })

        // Find tiles that every unit is capable of attacking to, and insert the object into here.
        const canAttack = {}
        Object.entries(allEligibleAttacks).forEach(([tileId, attacks]) => {
            if (attacks.length === units.length)
                canAttack[tileId] = attacks
        })

        return canAttack // An object with a tileId as the key, and an array of attacks.
    }

    return {}
}

export const calculateIndirectAttackChanceModifier = (unit, terrain) => {
    if (unit instanceof Unit && terrain instanceof Terrain) {
        const type = unit.type;
        const chance = terrain.protection?.chance_modifier ?? 0
        if (!!type) {
            const chance_modifier = terrain.protection?.chance_modifiers_by_attack_type[type] ?? 0;
            return chance + chance_modifier;
        }

        return chance;
    }

    return 0
}

export const calculateIndirectAttackDamageModifier = (unit, terrain) => {
    if (unit instanceof Unit && terrain instanceof Terrain) {
        const type = unit.type;
        const damage = this.protection?.damage_modifier ?? 0
        if (!!type) {
            const damage_modifier = this.protection?.damage_modifiers_by_attack_type[type] ?? 0
            return damage + damage_modifier;
        }

        return damage
    }

    return 0
}