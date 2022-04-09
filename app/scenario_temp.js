export const scenario = {
    devMode: false,
    columns: 26,
    rows: 12,

    factions: [
        {
            name: 'United States',
            color: {
                text: '#151A1E',
                background: '#95B07E'
            },
        },
        {
            name: 'Germany',
            color: {
                text: '#151A1E',
                background: '#9BADB7'
            },
        }
    ],

    unit_templates: {
        infantry: {
            health: 4,
            available_movement: 1,
            movement_cap: 1
        }
    },

    currentTurn: 'United States',

    tiles: {
        '*': {},
        '1-A-1': {
            units: {
                'United States': ['infantry']
            }
        },
        '1-B-1': {
            units: {
                'United States': ['infantry', 'infantry', 'infantry']
            }
        },
        '1-A-2': {
            units: {
                'Germany': ['infantry', 'infantry', 'infantry']
            }
        }
    }
}