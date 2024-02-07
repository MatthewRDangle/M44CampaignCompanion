const { contextBridge, ipcRenderer } = require("electron");

// Expose protected methods that allow the renderer process to use the ipcRenderer without exposing the entire object.
const public_channels = ['application/path', 'application/quit', 'system/getFileContent']
contextBridge.exposeInMainWorld('api', {
    handle: async (channel, ...args) => {
        if (public_channels.includes(channel)) {
            await ipcRenderer.invoke(channel, ...args);
        }
    }
})