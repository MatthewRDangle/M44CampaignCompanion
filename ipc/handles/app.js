const {app, ipcMain} = require("electron");

const appHandle = (path) => {
        ipcMain.handle(path + '/quit', async (e, path) => {
        app.quit();
    })

    ipcMain.handle(path + '/path', () => {
        return global.appdir;
    })
}

module.exports = appHandle