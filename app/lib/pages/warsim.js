const m = require('mithril');
import Page from '../models/page.js'
import GameBoard from "../models/gameboard.js";

export const page = new Page('/warSim');
page.setPage(function() {
    return m('div.game', [
        m('div#game.game_canvas'),
        m('div.game_overlay')
    ])
});
page.oncreate = () => {
    let game_element = document.getElementById('game');
    const map = new GameBoard(game_element, 32, 32);
};