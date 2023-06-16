const {ipcRenderer} = require('electron');


export const nav = [
    {
        label: 'Skirmish',
        path: '/session/lobby',
    }, {
        label: 'Multiplayer',
        path: '/multiplayer',
        disabled: true
    },
    {
        label: 'Scenarios',
        path: '/settings/scenarios',
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