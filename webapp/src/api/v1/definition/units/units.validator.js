import unitValidator from "./unit.validator";

export default (definition) => {
    // Check if the definition is in the correct format.
    if (!!definition && !Array.isArray(definition))
        throw Error('Unit templates must be in array format if they exist.')

    // Check the contents of each array and validate the definition.
    definition.forEach((unit_definition, idx) => {
        try {
            unitValidator(unit_definition);
        }
        catch (e) {
            e.message += `See units definition at array index ${idx}.`
            throw e;
        }
    })
}