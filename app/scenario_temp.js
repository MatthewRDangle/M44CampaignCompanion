export const scenario = {
    devMode: true,
    columns: 26,
    rows: 12,

    currentTurn: 'United States',
    turnOrder: ['United States', 'Germany'],

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

    terrains: [
        {
            name: 'Grassland',
            color: '#C5D6B7',
            movement_cost: 2
        },
        {
            name: 'Forest',
            color: '#5F7251',
            movement_cost: 4,
            movement_cost_modifiers_by_type: {
                'Vehicle': 4
            }
        },
        {
            name: 'Water',
            color: '#55B6CC',
            movement_cost: 2,
            inaccessible_by: ['Infantry', 'Vehicle']
        },
        {
            name: 'Road',
            color: '#CBCBCB',
            movement_cost: 1
        },
        {
            name: 'Town',
            color: '#868686',
            movement_cost: 4,
            movement_cost_modifiers_by_type: {
                'Vehicle': 4
            }
        },
    ],

    unit_templates: {
        Infantry: {
            health: 4,
            available_movement: 4,
            movement_cap: 4,
            type: 'Infantry'
        },
        Tank: {
            health: 4,
            available_movement: 8,
            movement_cap: 8,
            type: 'Vehicle'
        }
    },

    tiles: {
        '*': {
            terrain: 'Grassland'
        },
        '1-': {
            '15': {
                terrain: 'Road'
            }
        },
        '2-': {
            '6, 7, 8': {
                terrain: 'Forest'
            },
            '14': {
                terrain: 'Road'
            }
        },
        '3-': {
            '5, 6, 7': {
                terrain: 'Forest'
            },
            '8': {
                terrain: 'Water'
            },
            '14': {
                terrain: 'Road'
            }
        },
        '4-': {
            '5, 6': {
                terrain: 'Forest'
            },
            '7, 8': {
                terrain: 'Water'
            },
            '10, 11': {
                terrain: 'Town'
            },
            '13': {
                terrain: 'Road'
            }
        },
        '5-': {
            '7, 8, 9': {
                terrain: 'Water'
            },
            '10, 11, 12': {
                terrain: 'Town'
            },
            '13': {
                terrain: 'Road'
            },
            '14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26': {
                terrain: 'Road'
            }
        },
        '6-': {
            '2, 3, 4': {
                terrain: 'Forest'
            },
            '7, 8': {
                terrain: 'Water'
            },
            '12, 13, 14': {
                terrain: 'Town'
            },
            '18, 19, 20, 21, 22': {
                terrain: 'Forest'
            }
        },
        '7-': {
            '2, 3, 4': {
                terrain: 'Forest'
            },
            '8': {
                terrain: 'Water'
            },
            '11': {
                terrain: 'Forest'
            },
            '12': {
                terrain: 'Road'
            },
            '13, 14': {
                terrain: 'Town'
            },
            '20, 21': {
                terrain: 'Forest'
            }
        },
        '8-': {
            '10': {
                terrain: 'Forest'
            },
            '11, 12, 13': {
                terrain: 'Road'
            },
            '14': {
                terrain: 'Town'
            },
            '15': {
                terrain: 'Water'
            }
        },
        '9-': {
            '1, 2': {
                terrain: 'Road'
            },
            '11, 14': {
                terrain: 'Road'
            },
            '15': {
                terrain: 'Water'
            }
        },
        '10-': {
            '2, 3, 4, 5, 6, 7, 8, 9, 10, 14, 15, 16, 16, 17, 18, 19, 20, 21, 22': {
                terrain: 'Road'
            }
        },
        '11-': {
            '3': {
                terrain: 'Water'
            },
            '10, 23, 24, 25': {
                terrain: 'Road'
            },
            '14, 15': {
                terrain: 'Water'
            }
        },
        '12-': {
            '2, 3': {
                terrain: 'Water'
            },
            '9, 25': {
               terrain: 'Road'
            },
            '13, 14, 15, 16': {
                terrain: 'Water'
            }
        },
        '-23': {
            '6, 7, 8, 9': {
                terrain: 'Road'
            }
        },

        '9-2': {
            units: {
                'United States': ['Infantry', 'Infantry', 'Infantry', 'Tank']
            }
        },
        '11-10': {
            units: {
                'United States': ['Infantry', 'Infantry', 'Infantry', 'Tank']
            }
        },
        '12-9': {
            units: {
                'United States': ['Infantry', 'Infantry', 'Infantry', 'Tank']
            }
        },

        '1-15': {
            units: {
                'Germany': ['Infantry', 'Infantry', 'Infantry', 'Tank']
            }
        },
        '2-14': {
            units: {
                'Germany': ['Infantry', 'Infantry', 'Infantry', 'Tank']
            }
        },
        '5-26': {
            units: {
                'Germany': ['Infantry', 'Infantry', 'Infantry', 'Tank']
            }
        }
    }
}