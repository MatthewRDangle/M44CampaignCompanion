const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

const appArguments = process.argv;

const createWindow = () => {
    global.appdir = __dirname;

    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            devTools: appArguments.includes('dev'),
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    win.setIcon(path.join(__dirname, 'src', 'images', 'icon', 'favicon-32x32.png'))
    win.webContents.openDevTools();
    win.setMenu(null);
    win.loadFile(path.join(global.appdir, 'index.html'));
    win.maximize();
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

ipcMain.on('close-app', (evt, arg) => {
    if (process.platform !== 'darwin') app.quit()
})

ipcMain.handle('getAppPath', () => {
    return global.appdir;
});