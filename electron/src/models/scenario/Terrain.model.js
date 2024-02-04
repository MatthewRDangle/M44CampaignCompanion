import ScenarioDefinitionStore from "../../stores/Definition.store.js";

export default class Terrain {

    constructor() {
        this.name = 'Unknown';
        this.color = 'transparent';
        this.render = false;

        // TODO merge into movement object
        this.movement_cost = 0;
        this.movement_cost_modifiers_by_type = {};

        // TODO move into accessibility object.
        this.max_units_allowed = undefined;
        this.max_units_allowed_per_faction = undefined;
        this.inaccessible_by = [];

        this.protection = {
            chance_modifier: 0,
            chance_modifiers_by_attack_type: {},
            damage_modifier: 0,
            damage_modifiers_by_attack_type: {}
        }
    }

    get activeScenario() {
        return ScenarioDefinitionStore.activeScenarioDefinition;
    }
    //
    // calculateAccessibilityByUnit(unit) {
    //     return this.inaccessible_by.includes(unit.type)
    // }
    //
    // calculateMovementCostByUnit(unit) {
    //     const type = unit.type;
    //     if (!!type) {
    //         const modifier = this.movement_cost_modifiers_by_type[type] || 0
    //         return this.movement_cost + modifier;
    //     }
    //
    //     return this.movement_cost;
    // }

    calculateIndirectAttackChanceModifier(unit) {
        const type = unit.type;
        const chance = this.protection?.chance_modifier ?? 0
        if (!!type) {
            const chance_modifier = this.protection?.chance_modifiers_by_attack_type[type] ?? 0;
            return chance + chance_modifier;
        }

        return chance;
    }

    calculateIndirectAttackDamageModifier(unit) {
        const type = unit.type;
        const damage = this.protection?.damage_modifier ?? 0
        if (!!type) {
            const damage_modifier = this.protection?.damage_modifiers_by_attack_type[type] ?? 0
            return damage + damage_modifier;
        }

        return damage
    }

    compile(terrainDefinition) {
        if (terrainDefinition.render !== false) {
            this.name = terrainDefinition.name || 'Unknown';
            this.movement_cost = terrainDefinition?.movement_cost || 1;
            this.movement_cost_modifiers_by_type = terrainDefinition?.movement_cost_modifiers_by_type || {};
            this.max_units_allowed = terrainDefinition.max_units_allowed || undefined;
            this.max_units_allowed_per_faction = terrainDefinition.max_units_allowed_per_faction || undefined;
            this.inaccessible_by = terrainDefinition?.inaccessible_by || [];
            this.color = terrainDefinition?.color || '#000000';
            this.protection.chance_modifier = terrainDefinition.protection?.chance_modifier || 0
            this.protection.chance_modifiers_by_attack_type = terrainDefinition.protection?.chance_modifiers_by_attack_type || {}
            this.protection.damage_modifier = terrainDefinition.protection?.damage_modifier || 0
            this.protection.damage_modifiers_by_attack_type = terrainDefinition.protection?.damage_modifier || {}
            this.render = true;
        }
    }
}