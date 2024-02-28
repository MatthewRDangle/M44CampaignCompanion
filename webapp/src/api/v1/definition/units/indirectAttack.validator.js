export default (definition) => {
        const {
            range,
            damage,
            chance,
        } = definition;

        // Validate Required properties.
        if (typeof range !== 'number' || range <= 0)
            throw Error(`Range must be a number greater than 0.`);

        if (typeof damage !== 'number' && damage < 0)
            throw Error('Damage must be a number greater than 0.');

        if (typeof chance !== 'number' && chance < 0)
            throw Error('Chance must be a number greater than or equal to 0.');
}