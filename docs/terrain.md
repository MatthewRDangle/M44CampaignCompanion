> **Alert:** This is an alpha release. It may be inaccurate and may change in an upcoming release.

# Terrain
Terrain is the transversal logic for unit navigating and indirect battling. 

## Model
    name: string [Required]
    color: string [Required]
    render: [Optional]
    movement_cost: number [Optional]
    movement_cost_modifiers_by_type: Object [Optional]
        Armour: number [Optional]
    max_units_allowed_per_faction: number [Optional]
    inaccessible_by_unit_type: Array<string>
    protection: Protection [Optional]

- **Name:** A text reference to import this object later on another definition.
- **Color:** The hex color for the background of this tile.
- **Render:** Hides the tile from the game.
- **Movement Cost:** The number to substract for a units available movement
entering this tile.
- **Movement Cost Modifiers by Type:** An object to modifying the movement cost
field by the type property attached to a unit.
- **Max Units Allowed Per Faction:** The number of units allowed in this tile
for each faction.
- **Max Units Allowed Per Faction:** Units which have the corresponding type will be unable to transverse this tile.
- **Protection:** An object to contain all indirect attack protection logic.

## Example
The following is an example in yaml markup.

    ---
    name: Victory City
    color: "#F2F2F2"
    movement_cost: 2
    movement_cost_modifiers_by_type:
        Armour: 1
    max_units_allowed_per_faction: 7
    protection:
        chance_modifier: -25
    ...