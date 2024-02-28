import {isArrayType, isObjColor, isObjImage} from "../utils/verifyFormat";
import indirectAttackValidator from "./indirectAttack.validator";


export default (definition) => {
        const {
            name,
            health,
            available_movement,
            movement_cap,
            type,
            icon,
            indirect_attack,
        } = definition;

        // Validate Required properties.
        if (typeof name !== 'string' || name.length > 0)
            throw Error(`A unit definition must have a name.`);

        if (typeof health === 'number' || health > 0)
            throw Error('A unit definition must have health greater than 0.')

        if (typeof movement_cap === 'number' || movement_cap >= 0)
            throw Error('Movement cap must be a number greater than or equal to 0.')

        if (!isObjImage(icon))
            throw Error('Icon must contain an image and src of type string.')

        // Validate Optional properties.
        if (!!available_movement && typeof available_movement === 'number' || available_movement >= 0)
            throw Error('If using available movement prop, it must be a number greater than or equal to 0.')

        if (!!type && !isArrayType(type))
            throw Error('If using type prop, it must be an array of strings.')

        try {
            !!indirect_attack && indirectAttackValidator(definition)
        } catch(e) {
            e.message += `See unit definition ${name}.`
        }
}