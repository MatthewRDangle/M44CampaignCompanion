import {localData} from "../../localdata";

const m = require('mithril');
import Unit from "../../Unit.js";
import Faction from "./Faction";

export default class Tile {
    constructor() {

        // Interaction
        this.isSelected = false;

        // Ownership & Contest
        this.owner = undefined;
        this.isContested = false;

        // Terrain, Overlay, Units & Fortifications
        this.terrain = undefined;
        this.overlay = undefined;
        this.units = {};

        // Create Default Hex
        this.width = 20 * 10;
        this.height = 14 * 10;
        this.textColor = '0x000000';
        this.backgroundShape = 'hex';
        this.backgroundColor = '0xD2E2BB';

        // Relative Positioning.
        this.adjacentTiles = [];
    }

    compile(instructions, scenario) {
        if (!instructions) return
        for (let key in instructions.units) {
            const owner_faction = scenario.factions[key];
            if (owner_faction) {
                const unitsToCreate = instructions.units;
                if (Array.isArray(unitsToCreate)) {
                    unitsToCreate.forEach((unit) => {
                        if (typeof unit === 'string') {
                            scenario
                        }
                    })
                }
            }
        }
        // const factions_container = localData.navigate('factions').getValue();
        // const faction = factions_container[key];
        // if (faction) {
        //     const faction_instructions = instructions[key];
        //     for (let type in faction_instructions) {
        //         const count = faction_instructions[type];
        //         let unit = new Unit(faction);
        //         unit.health = count;
        //         unit.name = type;
        //         tile.addUnit(unit);
        //     }
        // }
    }




    addUnit(unit) {
        if (unit instanceof Unit) {
            if (this.units.hasOwnProperty(unit.faction) && Array.isArray(this.units[unit.faction]))
                this.units[unit.faction].push(unit);
        }
    }

    delselect() {
        this.isSelected = false;
    }

    select() {
        this.isSelected = true;
    }
}