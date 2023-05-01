const fs = require ("fs");
const path = require ("path");
const {ipcMain} = require("electron");

const systemHandle = (channel) => {
    ipcMain.handle(channel + '/getFileContent', (e, path) => {
        return new Promise(async resolve => {
            fs.readFile(path, 'utf8', (err, data) => {
                resolve(data);
            });
        })
    })
}

module.exports = systemHandle