const { app, BrowserWindow } = require('electron');
const ipcHandler = require('./system/main');
const path = require('path');

const appArguments = process.argv;

// GUI Config
const createWindow = () => {
    global.appdir = __dirname;

    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            devTools: appArguments.includes('dev'),
            nodeIntegration: true, // TODO set to true after securing ipcRenderer in renderer
            contextIsolation: false // TODO set to true after securing ipcRenderer in renderer
        }
    });
    win.setIcon(path.join(__dirname, '../', 'public', 'images', 'icon', 'favicon-32x32.png'))
    win.webContents.openDevTools();
    win.setMenu(null);
    win.loadFile(path.join(global.appdir, '../public/index.html'));
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

ipcHandler('/'); // initiate ipc handler.