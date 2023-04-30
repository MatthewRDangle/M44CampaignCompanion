const {app} = require("electron");


const quitApplication = () => {
    app.quit();
}


module.exports = {
    quitApplication: quitApplication,
}