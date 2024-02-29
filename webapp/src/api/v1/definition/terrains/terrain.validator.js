import protectionValidator from "./protection.validator";
import { isObjColor } from "../utils/verifyFormat";


export default (definition) => {
    const {
        name,
        color,
        movement_cost,
        max_units_allowed_per_faction,
        movement_cost_modifiers_by_type,
        inaccessible_by,
        protection,
    } = definition

    // Validate Required properties.
    if (typeof name !== 'string' || name.length > 0)
        throw Error('A map definition must have a name.');

    if (isObjColor(color))
        throw Error('A color hex must exist.')

    if (typeof movement_cost !== 'number' && movement_cost < 0)
        throw Error('Movement cost must be greater than or equal to 0.')

    if (!!protection) protectionValidator(definition)

    // Validate Optional properties.
    if (!!movement_cost_modifiers_by_type) {
        const modifierKeys = Object.keys(movement_cost_modifiers_by_type);
        modifierKeys.forEach((key, idx) => {
            const modifier = movement_cost_modifiers_by_type[key]
            if (typeof modifier !== 'number')
                throw Error(`Terrain definition ${name} movement_cost_modifiers_by_type prop contains a prop/value pair that's not a number at index ${idx}.`)
        })
    }

    if (!!inaccessible_by && Array.isArray(inaccessible_by)) {
        inaccessible_by.forEach((item, idx) => {
            if (typeof item !== 'string') throw Error(`Terrain definition ${name} inaccessible_by prop contains a value that is not a string at index ${idx}.`)
        })
    }

    if (!!max_units_allowed_per_faction && typeof max_units_allowed_per_faction !== 'number' && max_units_allowed_per_faction <= 0)
        throw Error('If setting max units allowed per faction prop, it must be of type number and greater than 0.')
}