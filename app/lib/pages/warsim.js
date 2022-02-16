const m = require('mithril');
import Page from '../models/page.js';
import GameBoard from "../models/gameboard.js";
import {localData} from "../../localdata.js";

export const page = new Page('/warSim');
page.setPage(function() {
    return m('div.game', [
        m('div#game.game_canvas'),
        m('div#gameOverlay.game_overlay')
    ])
});
page.oncreate = () => {
    let game_element = document.getElementById('game');
    const map = new GameBoard(game_element, 32, 32);
    localData.navigate('gameboard').setValue(map);
    map.onTileSelect = renderTileInfoOverlay;
};

const renderTileInfoOverlay = function(tile) {
    const gameOverlay_element = document.getElementById('gameOverlay');

    if (tile) {
        let unit_count = 0;
        let unit_ui = [];
        tile.state.units.forEach(function(unit) {
            unit_count = unit_count + unit.health;
            unit_ui.push(
                m('div.unitCard', {onclick: function(){ unit.select() }}, [
                    m('div.unitCard_count', unit.health),
                    m('div.unitCard_name', unit.name)
                ])
            );
        });

        const overlay = m('div.tileInfoOverlay', {
            onmousedown: function(e) {e.stopPropagation(); e.preventDefault();},
            onmouseup: function(e) {e.stopPropagation(); e.preventDefault();}
        }, [
            m('div.tileInfoOverlay_header', [
                m('div.tileInfoOverlay_header_unitCount',
                    m('div.badge', unit_count || '')
                ),
                m('div.tileInfoOverlay_header_tileName', tile.state.terrain),
                m('div.tileInfoOverlay_header_actions', [
                    m('div.tileInfoOverlay_header_actions_button', [
                        m('button.button', {onclick: tile.preview}, 'Preview')
                    ]),
                    m('div.tileInfoOverlay_header_actions_button', [
                        m('button.button', {onclick: tile.mergeUnit}, 'Merge')
                    ]),
                    m('div.tileInfoOverlay_header_actions_button', [
                        m('button.button', {onclick: tile.splitUnit}, 'Split')
                    ]),
                    m('div.tileInfoOverlay_header_actions_button', [
                        m('button.button', {onclick: tile.revertCommand}, 'Revert')
                    ])
                ])
            ]),
            m('div.tileInfoOverlay_body', unit_ui)
        ]);
        m.render(gameOverlay_element, overlay);
    } else { m.render(gameOverlay_element, ''); }
}