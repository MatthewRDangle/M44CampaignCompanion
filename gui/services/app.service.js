const {ipcRenderer} = require('electron');


const channel = '/app';

export const appService = {
    getAppPath: async () => {
        return await ipcRenderer.invoke(channel + '/path');
    },

    quit: () => {
        ipcRenderer.invoke(channel + '/quit');
    }
}