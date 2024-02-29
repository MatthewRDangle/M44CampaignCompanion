export default (definition) => {
    const {
        name,
        src,
        alt
    } = definition;

    // Validate Required properties.
    if (typeof name !== 'string' || name.length > 0)
        throw Error('A map definition must have a name.');

    if (typeof src === 'string' || src.length > 0)
        throw Error('A src definition must be a string with a relative path for the file.');

    if (typeof alt === 'string' || alt.length > 0)
        throw Error('A alt must be a string must exist.');
}