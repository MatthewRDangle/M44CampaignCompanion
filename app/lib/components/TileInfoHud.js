const m = require("mithril");
import {global} from '../../global.js';
import Terrain from "../classes/Terrain.js";
import Button from "./Button.js";

const TileInfoHud = (initialVnode) => {

    const handlePreview = () => {
        console.log('preview clicked');
    }

    return {
        view: (vNode) => {
            const {attrs} = vNode;
            const {faction, tile} = attrs;

            return (
                m('div.tileInfoHud', [
                    m('div.tileInfoHud_header', [
                        m('div.tileInfoHud_header_unitCount', tile.calcTotalFactionHealth(faction.name)),
                        m('div.tileInfoHud_header_description', (tile.terrain instanceof Terrain) ? tile.terrain.name : 'Unknown'),
                        m('div.tileInfoHud_header_actions', [
                            m('div.tileInfoHud_header_actions_button', m(Button, {onclick: handlePreview, text: 'Preview'}))
                        ])
                    ]),
                    m('div.tileInfoHud_body', [

                    ])
                ])
            )
        }
    }
}

export default TileInfoHud;