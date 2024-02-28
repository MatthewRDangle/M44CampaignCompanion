export default (manifest) => {
    const {
        UUID,
        format_version,
        name,
        scenario_definition,
        version,
        size,
        factions = '',
    } = manifest;

    // Validate Required properties.
    if (typeof UUID !== 'string' || typeof format_version !== 'number')
        throw Error('Incorrect manifest UUID or format_version.')

    if (typeof name !== 'string')
        throw Error('A name is required.')

    if (typeof version !== 'number')
        throw Error('A version number is required.')

    if (typeof scenario_definition !== 'string')
        throw Error('path to scenario definition does not exist.')

    // Validate Optional properties.
    if (!!size && typeof size.columns !== 'number' && typeof size.rows !== 'number')
        throw Error ('Size object does not include one or both of columns and rows as numbers.')

    if (!!factions && typeof factions !== 'string')
        throw Error ('Factions must be a string.')
}