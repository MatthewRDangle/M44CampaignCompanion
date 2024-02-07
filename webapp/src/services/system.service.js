const {ipcRenderer} = require('electron/src/main');


const channel = '/system';

export const systemService = {
    getFileContent: async (path) => {
        return await ipcRenderer.invoke(channel + '/getFileContent', path);
    }
}