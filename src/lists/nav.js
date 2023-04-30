const {ipcRenderer} = require('electron');


export const nav = [
    {
        label: 'Skirmish',
        path: '/lobby',
    }, {
        label: 'Multiplayer',
        path: '/multiplayer',
        disabled: true
    },
    {
        label: 'Scenarios',
        path: '/scenarios',
    },
    {
        label: 'Settings',
        path: '/settings',
        disabled: true
    },
    {
        label: 'Exit to Desktop',
        onclick: async () => {
            await ipcRenderer.invoke('/app/quit')
        }
    }
]