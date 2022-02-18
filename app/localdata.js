const Data = require("../api/data");
export const localData = new Data({
    viewMode: 'view',
    selected_tile: undefined,
    selected_unit: undefined,
    factions: {},
    gameboard: undefined,
    scene: undefined
});