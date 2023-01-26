const factionOwnsTileById = (scenarioDefinition, row, column) => {
    const { tiles, factions } = scenarioDefinition;

    const tile = tiles[row][column];
    const Germany = factions["Germany"];

    return tile.owner === Germany;
}

const onSuccess = () => {
    const { factions, setVictory, setFailure } = this;
    const { USSR, Germany } = factions;

    setVictory(Germany);
    setFailure(USSR);
}

export default {
    name: 'GermanyVictory',
    type: 'EndTurn',
    factions: ['Germany'],
    conditions: [
        () => factionOwnsTileById(this,5, 5),
    ],
    onSuccess: onSuccess,
    onFailure: undefined,
};