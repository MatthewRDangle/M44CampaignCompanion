const { app, BrowserWindow } = require('electron');
const ipcHandler = require('./modules/handler');
const path = require('path');

const appArguments = process.argv;

// GUI Config
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
    win.loadFile(path.join(global.appdir, '../../webapp/dist/index.html')); // TODO handle this via env variables
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