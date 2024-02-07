const {app, ipcMain} = require("electron");
const applicationController = require("./application/application.controller");
const systemController = require("./system/system.controller");


const handler = ()=> {

    // Handle closing the app via window-close button or bulk close button.
    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin')
            app.quit()
    })
    ipcMain.on('close-app', (evt, arg) => {
        if (process.platform !== 'darwin')
            app.quit()
    })

    // Import custom emitters.
    applicationController('/application');
    systemController('/system');
}

module.exports = handler;