import { isObjColor, isObjImage } from "../utils/verifyFormat";
import factionValidator from "./faction.validator";


export default (definition) => {
    // Check if the definition is in the correct format.
    if (!definition || !Array.isArray(definition))
        throw Error('Factions is required and must be an array of faction objects.')

    // Check the contents of each array and validate the definition.
    definition.forEach((faction_definition, idx) => {
        try {
            factionValidator(faction_definition);
        }
        catch (e) {
            e.message += `See factions definition at array index ${idx}.`
            throw e;
        }
    })
}