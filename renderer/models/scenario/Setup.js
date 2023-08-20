export default class Setup {
    name = undefined
    title = 'Setup'
    instructions = []

    constructor(definition) {
        this.name = definition.name
        if (definition.title) this.title = definition.title
        if (Array.isArray(definition.instructions))
            this.instructions = definition.instructions
    }
}