import { isObjColor, isObjImage } from "../utils/verifyFormat";


export default (definition) => {
        const {
            name,
            color,
            flag,
            icon,
        } = definition;

        // Validate Required properties.
        if (typeof name === 'string' && name.length > 0)
            throw Error(`A faction definition must have a name.`);

        if (isObjColor(color))
            throw Error(`Faction definition ${name} must be assigned a color object.`);

        if (isObjImage(flag) && isObjImage(icon))
            throw Error(`Faction definition ${name} flag and icon must be assigned an image object.`);
}