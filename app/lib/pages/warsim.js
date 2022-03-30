const m = require('mithril');
import Page from '../classes/Page.js';
import GameBoard from "../components/GameBoard.js"
// import GameBoard from "../models/GameBoard.js";
// import {localData} from "../../localdata.js";
// import mainMenuButtonOverlay from "../components/MainMenuButtonOverlay.js";
// import nextTurnOverlay from "../components/NextTurnOverlay.js";

export const page = new Page('/warSim');
page.setPage(function() {
    const grid = [
        [{}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}]
    ];
    return m(GameBoard, {grid: grid});
    // return m('div.game', [
    //     m('div#game.game_canvas'),
    //     m('div#gameOverlay.game_overlay', [
    //         m('div#gameOverlay-tileInfo'),
    //         m('div#gameOverlay-currentFaction'),
    //         m('div#gameOverlay-mainMenu',
    //             m(mainMenuButtonOverlay, {
    //                 onclick: () => { console.log('Main Menu Clicked') }
    //             })
    //         ),
    //         m('div#gameOverlay-nextTurn',
    //             m(nextTurnOverlay, {
    //                 onclick: () => { console.log('Next Turn Clicked') }
    //             })
    //         )
    //     ])
    // ])
});
// page.oncreate = () => {
//     let game_element = document.getElementById('game');
//     const map = new GameBoard(game_element, 32, 32);
//     localData.navigate('gameboard').setValue(map);
//     map.onTileSelect = renderTileInfoOverlay;
// };

// const renderTileInfoOverlay = function(tile) {
//     const overlay_parent = document.getElementById('gameOverlay-tileInfo');
//
//     if (tile) {
//         let unit_count = 0;
//         let unit_ui = [];
//         tile.state.units.forEach(function(unit) {
//             unit_count = unit_count + unit.health;
//             unit_ui.push(
//                 m('div.unitCard', {class: (unit.isSelected) ? '--selected' : '', onclick: function(){ unit.select() }}, [
//                     m('div.unitCard_count', unit.health),
//                     m('div.unitCard_name', unit.name)
//                 ])
//             );
//         });
//
//         const overlay_component = m('div.tileInfoOverlay', {
//             onmousedown: function(e) {e.stopPropagation(); e.preventDefault();},
//             onmouseup: function(e) {e.stopPropagation(); e.preventDefault();}
//         }, [
//             m('div.tileInfoOverlay_header', [
//                 m('div.tileInfoOverlay_header_unitCount',
//                     m('div.badge', unit_count || '')
//                 ),
//                 m('div.tileInfoOverlay_header_tileName', (tile.state.terrain) ? tile.state.terrain.name : 'Unknown'),
//                 m('div.tileInfoOverlay_header_actions',
//                     (tile.state.isContested) ? m('div.tileInfoOverlay_header_actions_button', [
//                         m('button.button', {onclick: tile.battle}, 'Battle')
//                     ]) : [m('div.tileInfoOverlay_header_actions_button', [
//                         m('button.button', {onclick: tile.preview}, 'Preview')
//                     ]),
//                     m('div.tileInfoOverlay_header_actions_button', [
//                         m('button.button', {onclick: tile.mergeUnit}, 'Merge')
//                     ]),
//                     m('div.tileInfoOverlay_header_actions_button', [
//                         m('button.button', {onclick: tile.splitUnit}, 'Split')
//                     ]),
//                     m('div.tileInfoOverlay_header_actions_button', [
//                         m('button.button', {onclick: tile.revertCommand}, 'Revert')
//                     ])]
//                 )
//             ]),
//             m('div.tileInfoOverlay_body', unit_ui)
//         ]);
//         m.render(overlay_parent, overlay_component);
//     } else { m.render(overlay_parent, ''); }
// }
