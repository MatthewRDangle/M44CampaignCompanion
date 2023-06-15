import Unit from "./Unit.js";
import ScenarioDefinition from "./ScenarioDefinition.js";
import Faction from "./Faction.js";
import ScenarioDefinitionStore from "../../stores/ScenarioDefinition.store.js";
import Overlay from "./Overlay.js";
import Battle from "./Battle.js";
import BattleMap from "./BattleMap.js";


export default class Tile {

    constructor() {
        this.id = '';
        this.row = 0;
        this.column = 0;

        // Interaction
        this.isSelected = false;

        // Ownership
        this.owner = undefined;
        this.battle = undefined;
        this.isContested = false;

        // BattleMap, Terrain, Overlays, Units
        this.battleMap = undefined;
        this.terrain = {};
        this.overlays = {};
        this.units = {};

        // Relative Positioning.
        this.adjacentTiles = [];
    }

    get activeScenario() {
        return ScenarioDefinitionStore.activeScenarioDefinition;
    }


    adjacentMovementCost() {
        const movement_info = {};
        const activeScenarios = this.activeScenario;
        this.adjacentTiles.forEach(function (tileId) {
            const [row] = tileId.split('-');
            if (row > 0 && row <= activeScenarios.rows) {
                const tile = activeScenarios.tiles[row][tileId];
                if (tile && !!tile?.terrain?.render)
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

    compile(definition, scenario) {
        if (!definition) return

        // Apply Terrain
        if (definition.terrain)
            this.terrain = scenario.terrains[definition.terrain]

        // Apply Overlay
        if (definition.overlays && Array.isArray(definition.overlays)) {
            definition.overlays.forEach((overlayDefinition) => {
                if (typeof overlayDefinition === 'string') {
                    const foundOverlay = scenario.overlays[overlayDefinition];
                    if (foundOverlay && !!foundOverlay.name)
                        this.overlays[foundOverlay.name] = foundOverlay;
                }
                else {
                    const newOverlay = new Overlay();
                    newOverlay.compile(overlayDefinition);
                    this.overlays[overlayDefinition.name] = newOverlay;
                }
            })
        }

        // Apply Units.
        for (let key in definition.units) {
            const owner_faction = scenario.factions[key];
            if (owner_faction) {
                const unitsToCreate = definition.units[owner_faction.name];
                if (Array.isArray(unitsToCreate)) {
                    unitsToCreate.forEach((unit_template) => {
                        if (typeof unit_template === 'string')
                            unit_template = scenario.unit_templates[unit_template];
                        this.addUnit(new Unit(owner_faction, unit_template));
                    })
                }
            }
        }

        // Apply BattleMap
        if (definition.battleMap) {
            if (typeof definition.battleMap === 'string')
                this.battleMap = scenario.battleMaps[definition.battleMap];
            else if (typeof definition.battleMap === 'object' && definition.battleMap.hasOwnProperty('src') && definition.battleMap.hasOwnProperty('alt'))
                this.battleMap = new BattleMap(definition.battleMap);
        }
    }

    contest(invader) {
        if (invader instanceof Faction) {
            if (!!this.units[this.owner?.name]) {
                this.isContested = invader;
                this.battle = new Battle(this);
                this.activeScenario.trackBattle(this.battle);
            }
            else
                this.owner = invader;
        }
    }

    deselect() {
        this.isSelected = false;
        if (this.activeScenario instanceof ScenarioDefinition)
            this.activeScenario.selectedTile = undefined;
    }

    generateAdjacentTiles() { // TODO convert to setter and getter
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
        if (Object.keys(this.units).length <= 1) {
            this.battle = undefined;
            this.isContested = false;
            if (tileFactions.length > 0) // @Todo how to determine ownership if more than one faction survivor (think teams).
                this.owner = this.activeScenario.factions[tileFactions[0]];
            else
                this.owner = undefined;

            this.activeScenario.untrackBattle(this);
        }
        return !this.isContested;
    }

    setId(row, column) { // TODO convert to setter and getter
        if (Number.isInteger(row) && Number.isInteger(column)) {
            this.row = row;
            this.column = column;
            this.id = `${row}-${column}`;
        }
    }

    select() {
        this.isSelected = true;
        if (this.activeScenario instanceof ScenarioDefinition) {
            if (this.activeScenario.selectedTile === this)
                return

            if (this.activeScenario.selectedTile instanceof Tile)
                this.activeScenario.selectedTile.deselect();
            this.activeScenario.setSelectedTile(this);
        }
    }
}