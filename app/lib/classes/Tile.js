import Unit from "./Unit.js";
import {activeScenario} from "../../global.js"
import Scenario from "./Scenario.js";
import Terrain from "./Terrain.js";
import Faction from "./Faction.js";

export default class Tile {
    constructor() {
        this.id = '';
        this.row = 0;
        this.column = 0;

        // Interaction
        this.isSelected = false;
        this.preview = {
            src: 'lib/images/placeholder.PNG',
            alt: ''
        };

        // Ownership & Contest
        this.owner = undefined;
        this.isContested = false;

        // Terrain, Overlay, Units & Fortifications
        this.terrain = new Terrain();
        this.units = {};

        // Relative Positioning.
        this.adjacentTiles = [];
    }

    adjacentMovementCost() {
        const movement_info = {};
        const row = this.row;
        this.adjacentTiles.forEach(function (tileId) {
            const [row, column] = tileId.split('-');
            if (row > 0) {
                const tile = activeScenario.tiles[row][tileId];
                if (tile)
                    movement_info[tileId] = tile.terrain.movement_cost;
            }
        });
        return movement_info;
    }

    addUnit(unit) {
        if (unit instanceof Unit) {
            if (!this.units.hasOwnProperty(unit.faction.name))
                this.units[unit.faction.name] = [];
            if (Array.isArray(this.units[unit.faction.name])) {
                this.units[unit.faction.name].push(unit);
                unit.attachTile(this);

                if (this.owner !== unit.faction)
                    this.contest(unit.faction)
            }
        }
    }

    calcTotalFactionHealth(factionName) {
        if (typeof factionName === 'string') {
            const units = this.units[factionName];
            if (units)
                return units.reduce((p, c) => (p + c.health), 0)
            else
                return 0;
        }
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

    contest(invader) {
        if (invader instanceof Faction) {
            if (!!this.units[this.owner?.name]) {
                this.isContested = invader;
                activeScenario.appendContest(this);
            }
            else
                this.owner = invader;
        }
    }

    deselect() {
        this.isSelected = false;
        if (activeScenario instanceof Scenario)
            activeScenario.selectedTile = undefined;

    }

    generateAdjacentTiles() {
        const adjacentColumn = this.row % 2 ? this.column - 1 : this.column + 1;

        this.adjacentTiles.push(`${this.row - 1}-${this.column}`) // Top
        this.adjacentTiles.push(`${this.row}-${this.column - 1}`) // Middle
        this.adjacentTiles.push(`${this.row + 1}-${this.column}`) // Bottom

        this.adjacentTiles.push(`${this.row - 1}-${adjacentColumn}`) // Top
        this.adjacentTiles.push(`${this.row}-${this.column + 1}`) // Middle
        this.adjacentTiles.push(`${this.row + 1}-${adjacentColumn}`) // Right
    }

    removeUnit(unit) {
        if (unit instanceof Unit) {
            const unitArrayByFaction = this.units[unit.faction.name];
            if (Array.isArray(unitArrayByFaction) && unitArrayByFaction.includes(unit)) {
                unitArrayByFaction.splice(unitArrayByFaction.indexOf(unit), 1);
                unit.detachTile();
                if (unitArrayByFaction.length === 0)
                    delete this.units[unit.faction.name];
            }
        }
    }

    resolve() {
        const tileFactions = Object.keys(this.units);
        if (Object.keys(this.units).length === 1) {
            this.isContested = false;
            this.owner = activeScenario.factions[tileFactions[0]];
            activeScenario.resolveContest(this);
        }
        return !this.isContested;
    }

    setId(row, column) {
        if (Number.isInteger(row) && Number.isInteger(column)) {
            this.row = row;
            this.column = column;
            this.id = `${row}-${column}`;
        }
    }

    select() {
        this.isSelected = true;
        if (activeScenario instanceof Scenario) {
            if (activeScenario.selectedTile === this)
                return

            if (activeScenario.selectedTile instanceof Tile)
                activeScenario.selectedTile.deselect();
            activeScenario.setSelectedTile(this);
        }
    }
}