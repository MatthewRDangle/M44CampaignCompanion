const {ipcRenderer} = require('electron');


export const nav = [
    {
        label: 'Skirmish',
        path: '/lobby',
        disabled: false,
    }, {
        label: 'Multiplayer',
        path: '/multiplayer',
        disabled: true
    },
    {
        label: 'Scenarios',
        path: '/scenarios',
        disabled: true
    },
    {
        label: 'Settings',
        path: '/settings',
        disabled: false
    },
    {
        label: 'Exit to Desktop',
        onclick: async () => {
            await ipcRenderer.invoke('/api/app/quitApplication')
        }
    }
]