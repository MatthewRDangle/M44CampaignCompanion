export default [
    {
        key: 'name',
        as: 'Scenario',
    },
    {
        key: 'factions',
        as: 'Factions',
    },
    {
        key: 'size',
        as: 'Size',
        valueHandler: (value) => `${value.columns}w x ${value.rows}h`
    },
]