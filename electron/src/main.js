const { app, BrowserWindow } = require('electron');
const ipcHandler = require('./modules/handler');
const path = require('path');
require('dotenv').config()

const appArguments = process.argv;
const env = process.env
const resourcesPath = process.resourcesPath

// Find the webapp dir path
const webappDir =
    !!env.WEBAPP_DIR
        ? env.WEBAPP_DIR
        : path.join(resourcesPath, 'webapp');

// Browser Window Config
const createWindow = () => {
    global.appdir = __dirname;
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, "preload.js"),
            devTools: appArguments.includes('dev'),
        }
    });
    win.setIcon(path.join(__dirname, '../', 'public', 'images', 'icon', 'favicon-32x32.png'))
    win.webContents.openDevTools();
    win.setMenu(null);
    win.loadFile(path.join(webappDir, 'dist/index.html'));
    win.maximize();
}

// Open GUI
app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0)
            createWindow()
    })
})

ipcHandler(); // initiate ipc handler.