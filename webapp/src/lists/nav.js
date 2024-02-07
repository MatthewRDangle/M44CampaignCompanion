import {appService} from "../services/app.service.js";


export const nav = [
    {
        label: 'Tutorial',
        path: '/session/lobby',
        disabled: true
    },
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
            await appService.quit()
        }
    }
]