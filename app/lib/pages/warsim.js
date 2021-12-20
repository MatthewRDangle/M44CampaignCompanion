const m = require('mithril');
import Page from '../models/page.js'
import GameBoard from "../models/gameboard.js";

export const page = new Page('/warSim');
page.setPage(function() {
    return m('div.game', [
        m('div#game.game_canvas'),
        m('div.game_overlay', [
            m('div.tileInfoOverlay', {
                    onmousedown: function(e) {e.stopPropagation(); e.preventDefault();},
                    onmouseup: function(e) {e.stopPropagation(); e.preventDefault();}
                }, [
                m('div.tileInfoOverlay_header', [
                    m('div.tileInfoOverlay_header_unitCount',
                        m('badge', '22')
                    ),
                    m('div.tileInfoOverlay_header_tileName', 'Grassland'),
                    m('div.tileInfoOverlay_header_actions', [
                        m('div.tileInfoOverlay_header_actions_button', [
                            m('button.button', 'Preview')
                        ]),
                        m('div.tileInfoOverlay_header_actions_button', [
                            m('button.button', 'Merge')
                        ]),
                        m('div.tileInfoOverlay_header_actions_button', [
                            m('button.button', 'Split')
                        ]),
                        m('div.tileInfoOverlay_header_actions_button', [
                            m('button.button', 'Revert')
                        ])
                    ])
                ]),
                m('div.tileInfoOverlay_body')
            ])
        ])
    ])
});
page.oncreate = () => {
    let game_element = document.getElementById('game');
    const map = new GameBoard(game_element, 32, 32);
};