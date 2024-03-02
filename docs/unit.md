> **Alert:** This is an alpha release. It may be inaccurate and may change in an upcoming release.

# Unit
A unit that a faction will control to attack and defend with in both BattleCry
and a scenarios board game attribute.

## Model
    name: string [Required]
    health: number [Optional]
    movement_cap: number [Optional]
    available_movement: number [Optional]
    type: Array<string> [Optional]
    icon: Image [Optional]
    Indirect_Attack: Weapon [Optional]

- **Name:** The text reference to be used later for import.
- **Health**: The amount of health the unit has.
- **Movement Cap:** The max movement available to the unit ever. Used 
when the movement is refreshed.
- **Available Movement:** How much movement the unit currently has available.
- **Type:** Group-like attributes to attach to this unit.
- **Icon:** An image to represent this unit.
- **Indirect Attack:** The weapon used to attack unit indirectly.

## Example
    ---
    name: Huge Cannon
    health: 2
    available_movement: 2
    movement_cap: 2
    type: Artillery
    icon:
        src: lib/icons/artillery.svg
        alt: Artillery
    indirect_attack:
        range: 3
        damage: 1
        chance: 50
    ...