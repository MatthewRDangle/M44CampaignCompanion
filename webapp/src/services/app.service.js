const {ipcRenderer} = require('electron/src/main');


const channel = '/app';

export const appService = {
    getAppPath: async () => {
        return await ipcRenderer.invoke(channel + '/path');
    },

    quit: () => {
        ipcRenderer.invoke(channel + '/quit');
    }
}