import {appService} from "../../services/app.service.js";


export default [
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