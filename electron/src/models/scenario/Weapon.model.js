export default class Weapon {
    id = undefined
    name = undefined
    type = []
    direct = false
    indirect = false
    indirectRange = undefined
    indirectDamage = undefined
    indirectChance = undefined
    indirectSplash = undefined
    indirectModifiersByType = undefined

    constructor() {}

    get displayName() {
        let tmpDisplayName = 'Unknown'
        if (this.name) tmpDisplayName = this.name
        else if (this.id) tmpDisplayName = this.id

        return tmpDisplayName
    }

    fire (tile) {
        // TODO Apply attack based on weapon type.
    }
}