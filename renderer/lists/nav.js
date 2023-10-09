const {ipcRenderer} = require('electron');


export const nav = [
    {
        label: 'Hotseat',
        path: '/session/lobby',
    }, {
        label: 'Network (LAN)',
        path: '/session/lobby',
        disabled: true
    },
    {
        label: 'Settings',
        path: '/settings/scenarios'
    },
    {
        label: 'Exit to Desktop',
        onclick: async () => {
            await ipcRenderer.invoke('/app/quit')
        }
    }
]