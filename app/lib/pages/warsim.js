const m = require('mithril');
import Page from '../classes/Page.js';
import GameBoard from "../components/GameBoard.js"

export const page = new Page('/warSim');
page.setPage(function() {
    return m(GameBoard);
});
