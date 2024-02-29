import overlayValidator from "./overlay.validator";


export default (definition) => {
    // Check if the definition is in the correct format.
    if (!!definition && !Array.isArray(definition))
        throw Error('Overlay must be in array format if they exist.')

    // Check the contents of each array and validate the definition.
    definition.forEach((overlay_definition, idx) => {
        try {
            overlayValidator(overlay_definition);
        }
        catch (e) {
            e.message += `See map definition at array index ${idx}.`
            throw e;
        }
    })
}