export default class BattleMap {
    constructor(name, src, alt) {
        if (!name || !src || !alt)
            throw Error('Unable to create battle map without a name, src, and alt.');

        this.name = name;
        this.src = src;
        this.alt = alt;
    }
}