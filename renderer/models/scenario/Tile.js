import Unit from "./Unit.js";
import Definition from "./Definition.js";
import Faction from "./Faction.js";
import Overlay from "./Overlay.js";
import Battle from "./Battle.js";
import Map from "./Map.js";
import ScenarioDefinitionStore from "../../stores/definition.store.js";
import ModeStore from "../../stores/mode.store.js";
import Setup from "./Setup.js";


export default class Tile {
    id = ''
    row = 0
    column = 0
    occupied_by = undefined
    battle = undefined
    isContested = false
    battleMap = undefined
    terrain = {}
    overlays = {}
    units = {}
    setup = undefined
    adjacentTiles = []

    constructor() {}

    get activeScenario() {
        return ScenarioDefinitionStore.activeScenarioDefinition;
    }

    get movementCost() {
        if (!this.terrain || !this.terrain.movement_cost || !this.terrain.render)
            return undefined

        const selectedUnit = ModeStore.selectedUnit
        if (!selectedUnit)
            return this.terrain.movement_cost
        else {
            const modifier = this.terrain.movement_cost_modifiers_by_type[selectedUnit.type] ?? 0
            return this.terrain.movement_cost + modifier
        }
    }

    get indirectAttackAccuracyModifier() {
        if (!this.terrain || !this.terrain.render)
            return undefined

        const selectedUnit = ModeStore.selectedUnit
        if (!selectedUnit)
            return this.terrain.protection.chance_modifier
        else {
            const modifier = this.terrain.protection.chance_modifiers_by_attack_type[selectedUnit] ?? 0
            return this.terrain.protection.chance_modifier + modifier
        }
    }

    get indirectAttackDamageModifier() {
        if (!this.terrain || !this.terrain.render)
            return undefined

        const selectedUnit = ModeStore.selectedUnit
        if (!selectedUnit)
            return this.terrain.protection.damage_modifier
        else {
            const modifier = this.terrain.protection.damage_modifiers_by_attack_type[selectedUnit] ?? 0
            return this.terrain.protection.damage_modifier + modifier
        }
    }

    get isHostile() {
        const currentTurnFaction = this.activeScenario.currentTurn;
        if (this.occupied_by === currentTurnFaction) return false

        let hasHostileUnits = false;
        const factionNameList = Object.keys(this.units);
        for (let idx = 0; idx < factionNameList.length; idx++) {
            const factionName = factionNameList[idx];
            if (factionName !== currentTurnFaction.name) {
                hasHostileUnits = true
                break
            }
        }

        return hasHostileUnits
    }

    get isSelected() {
        return this.activeScenario.selectedTile === this
    }

    get totalUnitCount() {
        let count = 0;
        Object.keys(key => {
            count += this.units[key].length;
        })

        return count;
    }

    get unitList() {
        let tmpUnitList = [];
        Object.values(this.units).forEach(tmpUnits => {
            tmpUnitList = tmpUnitList.concat(tmpUnits);
        })

        return tmpUnitList
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

                if (this.occupied_by !== unit.faction)
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

        // Apply Map
        if (definition.battleMap) {
            if (typeof definition.battleMap === 'string')
                this.battleMap = scenario.battleMaps[definition.battleMap];
            else if (typeof definition.battleMap === 'object' && definition.battleMap.hasOwnProperty('src') && definition.battleMap.hasOwnProperty('alt'))
                this.battleMap = new Map(definition.battleMap);
        }

        // Apply Setup
        if (definition.setup) {
            if (typeof definition.setup === 'string')
                this.setup = scenario.setups[definition.setup]
            else if (typeof definition.battleMap === 'object')
                this.setup = new Setup(definition.setup)
        }
    }

    contest(invader) {
        if (invader instanceof Faction && !this.isContested) {
            if (!!this.units[this.occupied_by?.name]) {
                this.isContested = invader;
                this.battle = new Battle(this);
                this.activeScenario.trackBattle(this.battle);
            }
            else
                this.occupied_by = invader;
        }
    }

    defendAgainstIndirectAttack(attack) {
        const unitList = [...this.unitList]
        unitList.forEach((unit) => {
            const chance = attack.chance;
            const chance_modifier = this.terrain.calculateIndirectAttackChanceModifier(unit);
            const roll = Math.round(Math.random() * 100); // Random number between 0 and 100
            if (roll <= (chance + chance_modifier)) {
                const damage = attack.damage;
                const damage_modifier = this.terrain.calculateIndirectAttackDamageModifier(unit);
                const apply_damage = damage - damage_modifier;
                if (apply_damage > 0)
                    unit.damage(apply_damage)
            }
        })
    }

    deselect() {
        if (this.activeScenario instanceof Definition)
            this.activeScenario.selectTile()
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
            this.activeScenario.untrackBattle(this.battle);
            this.battle = undefined;
            this.isContested = false;

            // Change owner.
            if (tileFactions.length > 0) // @Todo how to determine ownership if more than one faction survivor (think teams).
                this.occupied_by = this.activeScenario.factions[tileFactions[0]];
            else
                this.occupied_by = undefined;

            // Exhaust all units.
            if (this.occupied_by === this.activeScenario.currentTurn) {
                const units = this.units[this.occupied_by.name];
                if (Array.isArray(units)) {
                    units.forEach(unit => { unit.exhaust() })
                }
            }
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
        if (this.activeScenario instanceof Definition) {
            if (this.activeScenario.selectedTile === this)
                return

            if (this.activeScenario.selectedTile instanceof Tile)
                this.activeScenario.selectedTile.deselect();
            this.activeScenario.selectTile(this);
        }
    }
}