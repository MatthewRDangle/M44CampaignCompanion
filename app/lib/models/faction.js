export default class Faction {
    constructor(name, flag) {
        if (!name || !flag)
            throw Error('Unable to create faction without a name and flag.');

        this.name = name;
        this.flag = flag;
    }
}