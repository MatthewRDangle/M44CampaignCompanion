export const scenario = {
    devMode: false,
    columns: 26,
    rows: 12,

    factions: [
        {
            name: 'United States',
            color: '95B07E'
        },
        {
            name: 'Germany',
            color: '9BADB7'
        }
    ],

    units_templates: {
        infantry: {
            health: 4,
            available_movement: 1,
            movement_cap: 1
        }
    },

    tiles: {
        '*': {},
        '1-A-1': {
            units: {
                'United States': ['infantry']
            }
        }
    }
}