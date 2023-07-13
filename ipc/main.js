const {app, ipcMain} = require("electron");
const appHandler = require("./handles/app");
const systemHandler = require("./handles/system")


const ipcHandlerStartup = (channel) => {

    // Handle closing the app via window-close button or bulk close button.
    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin')
            app.quit()
    })
    ipcMain.on('close-app', (evt, arg) => {
        if (process.platform !== 'darwin')
            app.quit()
    })

    // Import custom handlers.
    appHandler(channel + 'app');
    systemHandler(channel + 'system');
}

module.exports = ipcHandlerStartup;