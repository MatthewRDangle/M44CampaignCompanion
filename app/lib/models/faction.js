export default class Faction {
    constructor(name, flag) {
        if (!name)
            throw Error('Unable to create faction without a name.');

        this.name = name;
        this.flag = flag;
    }
}