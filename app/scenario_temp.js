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
            available_movement: 2,
            movement_cap: 2
        },
        tank: {
            health: 4,
            available_movement: 6,
            movement_cap: 6
        }
    },

    currentTurn: 'United States',
    turnOrder: ['United States', 'Germany'],

    tiles: {
        '*': {},
        '1-1': {
            units: {
                'United States': ['infantry', 'tank']
            }
        },
        '1-2': {
            units: {
                'United States': ['infantry', 'infantry', 'infantry']
            }
        },
        '2-1': {
            units: {
                'Germany': ['infantry', 'infantry', 'infantry']
            }
        },
        '2-2': {
            units: {
                'Germany': ['infantry']
            }
        },
        '2-3': {
            units: {
                'Germany': ['infantry', 'tank']
            }
        }
    }
}