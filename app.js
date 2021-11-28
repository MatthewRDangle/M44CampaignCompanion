const BattleCry = require('../battlecry');

const app = new BattleCry('127.0.0.1', '8080', __dirname);
app.startServer();