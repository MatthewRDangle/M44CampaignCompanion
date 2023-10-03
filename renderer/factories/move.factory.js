import { createMovementCostsForOneUnit } from "./move.factory.old.js";

// TODO Abstract this into JS factory pattern.
// TODO ... just fix the bad code.
export function createMovementCostsForMultipleUnits (units) {
    if (Array.isArray(units)) {
        const allEligibleMoves = new Map()
        units.forEach(unit => {
            const eligibleMoves = createMovementCostsForOneUnit(unit)
            Object.keys(eligibleMoves).forEach((tileId) => {
                if (!allEligibleMoves.has(tileId)) allEligibleMoves.set(tileId, [])
                const cost = eligibleMoves[tileId]
                const move = createEligibleMove(cost, unit)
                allEligibleMoves.get(tileId).push(move)
            })
        })

        // Find tiles that every unit is capable of moving to, and insert the object into here.
        const canMoveTo = []
        allEligibleMoves.forEach((value) => {
            if (value.length === units.length)
                canMoveTo.push(value)
        })

        return canMoveTo
    }

    return []
}

const createEligibleMove = (cost, unit) => {
    return { cost, unit }
}