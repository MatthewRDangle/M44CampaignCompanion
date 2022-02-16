import Faction from './faction.js';
import PGUI from "./gui/pgui.js";
import {localData} from '../../localdata.js';

export default class Unit {
    constructor(owner) {
        if ( !(owner instanceof Faction) )
            throw Error('A unit must be assigned to a faction.');

        this.faction = owner;
        this.name = 'Unit';
        this.icon = undefined;
        this.health = 1;

        this.pgui = undefined;
        this.tile = undefined;
    }

    deselect() {
        localData.navigate('selected_unit').setValue(undefined);
        localData.navigate('viewMode').setValue('view');
    }

    draw(scene) {
        const unit_pgui = new PGUI(scene);

        const icon_parent = new PGUI(scene);
        unit_pgui.addChild(icon_parent);
        icon_parent.setState({
            geo: {
                x: 2,
                y: 2,
                z: 0
            },
            width: 78,
            height: 60,
            backgroundColor: '0x95B07E'
        });

        if (this.icon) {
            const icon = new PGUI(scene);
            icon_parent.addChild(icon);
            icon.setState({
                geo: {
                    x: icon_parent.width / 2,
                    y: icon_parent.height / 2,
                    z: 0
                },
                width: 78,
                height: 60,
                backgroundImage: this.icon
            });
        }

        const label = new PGUI(scene);
        unit_pgui.addChild(label);
        label.setState({
            geo: {
                x: 2,
                y: icon_parent.state.height,
                z: 0
            },
            width: 78,
            height: 31,
            textString: this.name,
            textHAlign: 'center',
            textVAlign: 'middle',
            backgroundColor: '0x151A1E'
        });

        const badge = new PGUI(scene);
        unit_pgui.addChild(badge);
        badge.setState({
            geo: {
                x: 69,
                y: 23,
                z: 0
            },
            height: 25,
            width: 25,
            textString: this.health,
            textHAlign: 'center',
            textVAlign: 'middle',
            backgroundColor: '0x151A1E'
        })

        unit_pgui.setState({
            geo: {
                x: 42.5,
                y: 10,
                z: 0
            },
            width: 82,
            height: 95,
            backgroundColor: '0x151A1E'
        });
        this.pgui = unit_pgui;
    }

    erase() {
        const pgui = this.pgui;
        if (pgui)
            this.pgui.destroy();
    }

    moveTo(tile) {
        if (this.tile)
            this.tile.removeUnit(this);
        tile.addUnit(this);
        this.deselect();
    }

    select() {
        localData.navigate('selected_unit').setValue(this);
        localData.navigate('viewMode').setValue('move');
    }

    warpTo(tile) {
        if (this.tile)
            tile.removeUnit();
        tile.addUnit(this);
    }
}