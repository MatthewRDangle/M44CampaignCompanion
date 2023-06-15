const {app, ipcMain} = require("electron");

const appHandle = (channel) => {
        ipcMain.handle(channel + '/quit', async (e, path) => {
        app.quit();
    })

    ipcMain.handle(channel + '/path', (e) => {
        return global.appdir;
    })
}

module.exports = appHandle