export const scenario = {
    devMode: false,
    columns: 26,
    rows: 12,

    factions: [
        {
            name: 'United States',
            color: '0x95B07E'
        },
        {
            name: 'Germany',
            color: '0x9BADB7'
        }
    ],

    tiles: {
        '*': {},
        '1-A-1': {
            'United States': {
                infantry: 12
            }
        },
        '1-B-1': {
            'United States': {
                tank: 12
            }
        },
        '1-B-2': {
            'Germany': {
                infantry: 12
            }
        }
    }
}