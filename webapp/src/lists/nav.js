import {appService} from "../services/app.service.js";


export const mainNav = [
    {
        label: 'Play',
        path: '/session',
    },
    {
        label: 'Settings',
        path: '/settings'
    },
    {
        label: 'Exit to Desktop',
        onclick: async () => {
            await appService.quit()
        }
    }
]

export const playNav = [
    {
        label: 'Hotseat',
        path: '/session/lobby',
    },
    {
        label: 'Lan/Network',
        disabled: true,
    },
    {
        label: 'Back',
        path: '/'
    }
]

export const settingsNav = [
    {
        label: 'Controls',
        disabled: true,
    },
    {
        label: 'Scenarios',
        path: '/settings/scenarios',
    },
    {
        label: 'Back',
        path: '/'
    }
]