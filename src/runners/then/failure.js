export default ({factions}) => {
    if (!!factions && Array.isArray(factions)) {
        this.enableFailure(factions)
        const allFactions = this.factions;

        const victoryFactions = [];
        allFactions.forEach(faction => {
            if (factions.includes(faction))
                victoryFactions.push(faction);
        });
        this.enableVictory(victoryFactions);
    }
}