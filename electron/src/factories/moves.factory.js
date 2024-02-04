export const createEligibleMove = (toTile, unit, cost, path) => {
    return {
        remainingMovement: unit.available_movement - cost,
        path: path,
        to: toTile,
        unit,
        cost
    }
}