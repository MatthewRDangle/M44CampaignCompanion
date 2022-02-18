export const scenario = {
    devMode: false,
    columns: 26,
    rows: 12,

    factions: ['United States', 'Germany'],

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
        }
    }
}