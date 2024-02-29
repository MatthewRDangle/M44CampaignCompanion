import mapValidator from "./map.validator";


export default (definition) => {
    // Check if the definition is in the correct format.
    if (!!definition && !Array.isArray(definition))
        throw Error('Maps must be in array format if they exist.')

    // Check the contents of each array and validate the definition.
    definition.forEach((map_definition, idx) => {
        try {
            mapValidator(map_definition);
        }
        catch (e) {
            e.message += `See map definition at array index ${idx}.`
            throw e;
        }
    })
}