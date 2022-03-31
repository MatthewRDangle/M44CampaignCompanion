import Unit from "./Unit.js";
import {global} from "../../global.js"
import {Scenario} from "./Scenario.js";

export default class Tile {
    constructor() {
        this.id = '';

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
                const unitsToCreate = instructions.units[owner_faction.name];
                if (Array.isArray(unitsToCreate)) {
                    unitsToCreate.forEach((unit_template) => {
                        if (typeof unit_template === 'string')
                            unit_template = scenario.unit_templates[unit_template];
                        this.addUnit(new Unit(owner_faction, unit_template));
                    })
                }
            }
        }
    }

    addUnit(unit) {
        if (unit instanceof Unit) {
            if (!this.units.hasOwnProperty(unit.faction.name))
                this.units[unit.faction.name] = [];
            if (Array.isArray(this.units[unit.faction.name]))
                this.units[unit.faction.name].push(unit);
        }
    }

    setId(id) {
        if (typeof id === 'string')
            this.id = id;
    }

    select() {
        this.isSelected = true;
        const activeScenario = global.getValue('activeScenario');
        if (activeScenario instanceof Scenario) {
            if (activeScenario.selectedTile)
                activeScenario.selectedTile.unselect();
            activeScenario.setSelectedTile(this);
        }
    }

    unselect() {
        this.isSelected = false;
        const activeScenario = global.getValue('activeScenario');
        if (activeScenario instanceof Scenario)
            activeScenario.selectedTile = undefined;

    }
}