import { isObjImage } from "../utils/verifyFormat";


export default (definition) => {
    const {
        name,
        images,
    } = definition;

    // Validate Required properties.
    if (typeof name !== 'string' || name.length > 0)
        throw Error('A map definition must have a name.');

    images.forEach((image_definition, idx) => {
        if (!isObjImage(image_definition))
            throw Error(`Overlay ${name} images prop has an malformed image definition at index ${idx}`);
    })
}