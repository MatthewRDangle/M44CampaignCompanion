export default ({factions}) => {
    if (!!factions && Array.isArray(factions)) {
        this.enableVictory(factions)
        const allFactions = this.factions;

        const failureFactions = [];
        allFactions.forEach(faction => {
            if (factions.includes(faction))
                failureFactions.push(faction);
        });
        this.enableFailure(failureFactions);
    }
}