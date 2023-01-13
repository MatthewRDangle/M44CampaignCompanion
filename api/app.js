const {app} = require("electron");


const quitApplication = (path) => {
    if (process.platform !== 'darwin')
        app.quit();
}


module.exports = {
    quitApplication: quitApplication,
}