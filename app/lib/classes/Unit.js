import Faction from './Faction.js';
import {activeScenario} from "../../global.js";
import Tile from "./Tile.js";

export default class Unit {
    constructor(owner, {...options}) {
        if ( !(owner instanceof Faction) )
            throw Error('A unit must be assigned to a faction.');

        this.faction = owner;
        this.isSelected = false;
        this.name = options.name || 'Unit';
        this.icon = options.icon || undefined;
        this.health = options.health || 1;

        this.available_movement = options.available_movement || 1;
        this.movement_cap = options.movement_cap || 1;
        this.canMoveTo = {};

        this.tile = undefined;
    }

    attachTile(tile) {
        if (tile instanceof Tile)
            this.tile = tile;
    }

    eligibleMoves() {
        const eligible_moves = {};
        if (this.tile instanceof Tile)
            checkMovement(this.tile, this.available_movement);
        this.canMoveTo = eligible_moves;
        return eligible_moves; // All eligible moves w/ remaining movement after moving.

        function checkMovement(tile, available_movement) {
            if (tile.isContested)
                return

            let movement_info = tile.adjacentMovementCost();
            for (let tileId in movement_info) {
                const movement_cost = movement_info[tileId];
                if ( movement_cost <= available_movement) {
                    const remaining_movement = available_movement - movement_cost;

                    // Check if tile already exists. If it does overwrite it if the new route has the highest available_movement remaining.
                    if (eligible_moves.hasOwnProperty(tileId) && eligible_moves[tileId] < remaining_movement)
                        eligible_moves[tileId] = remaining_movement;

                    // If it doesn't exist, add it.
                    else if (!eligible_moves.hasOwnProperty(tileId))
                        eligible_moves[tileId] = remaining_movement;

                    // Otherwise skip, because it shouldn't be added since it's a smaller number.
                    else
                        continue

                    // If there is any available movement left, repeat.
                    if (remaining_movement > 0) {
                        const [series, column, row] = tileId.split('-');
                        if (row - 1 >= 0) {
                            const tile = activeScenario.tiles[row - 1][tileId];
                            checkMovement(tile, remaining_movement);
                        }
                    }
                }
            }
        }
    }

    detachTile() {
        this.tile = undefined;
    }

    deselect() {
        this.isSelected = false;
        this.canMoveTo = {};
        if (activeScenario.selectedUnit instanceof Unit && activeScenario.selectedUnit === this)
            activeScenario.selectedUnit = undefined;
    }

    moveTo(tile) {
        if (this.tile) {
            const eligibleMoves = this.canMoveTo;
            for(let key in eligibleMoves) {
                const new_available_movement = eligibleMoves[key];
                if (tile.id === key && this.available_movement >= new_available_movement) {
                    this.warpTo(tile);
                    this.deselect();
                    this.available_movement = new_available_movement;

                    if (tile.owner !== this.faction)
                        tile.contest();
                }
            }
        }
    }

    select() {
        this.isSelected = true;
        this.eligibleMoves();
        if (activeScenario.selectedUnit instanceof Unit && activeScenario.selectedUnit !== this)
            activeScenario.selectedUnit.deselect();
        activeScenario.selectedUnit = this;
    }

    warpTo(tile) {
        if (tile instanceof Tile && tile !== this.tile) {
            this.tile.removeUnit(this);
            tile.addUnit(this);
        }
    }


    //
    // deselect() {
    //     this.isSelected = false;
    //     if (this.pgui)
    //         this.pgui.setState('backgroundColor', '0x151A1E');
    //     if (this.tile) {
    //         const map = localData.navigate('gameboard').getValue();
    //         map.onTileSelect(this.tile);
    //     }
    //     localData.navigate('selected_unit').setValue(undefined);
    //     localData.navigate('viewMode').setValue('view');
    // }
    //
    // draw(scene) {
    //     const unit_pgui = new PGUI(scene);
    //
    //     const icon_parent = new PGUI(scene);
    //     unit_pgui.addChild(icon_parent);
    //     icon_parent.setState({
    //         geo: {
    //             x: 2,
    //             y: 2,
    //             z: 0
    //         },
    //         width: 78,
    //         height: 60,
    //         backgroundColor: this.faction.color
    //     });
    //
    //     if (this.icon) {
    //         const icon = new PGUI(scene);
    //         icon_parent.addChild(icon);
    //         icon.setState({
    //             geo: {
    //                 x: icon_parent.width / 2,
    //                 y: icon_parent.height / 2,
    //                 z: 0
    //             },
    //             width: 78,
    //             height: 60,
    //             backgroundImage: this.icon
    //         });
    //     }
    //
    //     const label = new PGUI(scene);
    //     unit_pgui.addChild(label);
    //     label.setState({
    //         geo: {
    //             x: 2,
    //             y: icon_parent.state.height + 5,
    //             z: 0
    //         },
    //         width: 78,
    //         height: 26,
    //         textString: this.name,
    //         textHAlign: 'center',
    //         textVAlign: 'middle',
    //         backgroundColor: '0x151A1E'
    //     });
    //
    //     const badge = new PGUI(scene);
    //     unit_pgui.addChild(badge);
    //     badge.setState({
    //         geo: {
    //             x: 69,
    //             y: 23,
    //             z: 0
    //         },
    //         height: 25,
    //         width: 25,
    //         textString: this.health,
    //         textHAlign: 'center',
    //         textVAlign: 'middle',
    //         backgroundColor: '0x151A1E'
    //     })
    //
    //     unit_pgui.setState({
    //         geo: {
    //             x: 42.5,
    //             y: 10,
    //             z: 0
    //         },
    //         width: 82,
    //         height: 95,
    //         backgroundColor: '0x151A1E',
    //     });
    //     unit_pgui.addTag(this.faction.name);
    //     this.pgui = unit_pgui;
    // }
    //
    // erase() {
    //     const pgui = this.pgui;
    //     if (pgui)
    //         this.pgui.destroy();
    // }
    //
    // refresh() {
    //     this.available_movement = this.movement_cap;
    // }
    //
    // moveTo(tile) {
    //     if (this.tile) {
    //         const eligibleMoves = this.eligibleMoves();
    //         for(let key in eligibleMoves) {
    //             const new_available_movement = eligibleMoves[key];
    //             if (tile.id === key && this.available_movement >= new_available_movement) {
    //                 this.warpTo(tile);
    //                 this.deselect();
    //                 this.available_movement = new_available_movement;
    //
    //                 if (tile.state.owner !== this.faction)
    //                     tile.contest();
    //             }
    //         }
    //     }
    // }
    //
    // select() {
    //     this.isSelected = true;
    //     if (this.pgui)
    //         this.pgui.setState('backgroundColor', '0x0DBBD77');
    //     if (this.tile) {
    //         const map = localData.navigate('gameboard').getValue();
    //         map.onTileSelect(this.tile);
    //     }
    //     localData.navigate('selected_unit').setValue(this);
    //     localData.navigate('viewMode').setValue('move');
    // }
    //
    // warpTo(tile) {
    //     if (this.tile) {
    //         this.tile.removeUnit(this);
    //         tile.addUnit(this);
    //     }
    // }
}