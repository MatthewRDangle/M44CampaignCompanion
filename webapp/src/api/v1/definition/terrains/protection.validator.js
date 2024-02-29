export default (definition) => {
    const {
        chance_modifier,
    } = definition

    // Validate Required properties.
    if (typeof chance_modifier !== 'number')
        throw Error('The chance modifier must be any valid number.');
}