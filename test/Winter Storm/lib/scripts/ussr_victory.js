const factionOwnsTileById = (scenarioDefinition, row, column) => {
    const { tiles, factions } = scenarioDefinition;

    const tile = tiles[row][column];
    const USSR = factions["USSR"];

    return tile.owner === USSR;
}

const onSuccess = () => {
    const { factions, setVictory, setFailure } = this;
    const { USSR, Germany } = factions;

    setVictory(USSR);
    setFailure(Germany);
}

export default {
    name: 'USSRVictory',
    type: 'EndTurn',
    factions: ['USSR'],
    conditions: [
        () => factionOwnsTileById(this,1, 1),
        () => factionOwnsTileById(this,1, 2),
        () => factionOwnsTileById(this,1, 3),
    ],
    onSuccess: onSuccess,
    onFailure: undefined,
};