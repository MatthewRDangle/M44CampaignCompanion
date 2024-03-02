> **Alert:** This is an alpha release. It may be inaccurate and may change in an upcoming release.

# Definition
_This documentation refers to the main definition file._

The scenario is constructed by using dynamically imported definitions for 
everything. The hex grid, units, tiles, terrain, etc. These definitions are
then translated into code for play time. 

The definition plays the following roles:

- **Instructions for scenario setup:** These instructions are 
interpreted to set up the grid, units, rules, and define user interactions.
- **Templates for referencing:** Instead of writing the same code repeatedly, 
the templates can be referenced to be imported by the api. 
- **Conditional Scripting:** Predefined conditionals and action functions 
by the api that will be handled during runtime.

## Model
    factions: Array<Faction> [Required]
    turn_order: Array<string> [Required]
    current_turn: string [Optional]
    units: Array<Unit> [Optional]
    terrains: Array<Terrain> [Optional]
    maps: Array<Map> [Optional]
    overlays: Array<Overlay> [Optional]
    columns: number [required]
    rows: number [required]
    tiles: Object [required]
    scripts: Array<Script> [Optional]

- **factions:** The list of factions and their properties to be referenced 
later by name.
- **turn_order:** The order factions will take their turn.
- **current_turn:** The faction who is needs to take actions.
- **units:** A list of units and their properties to be referenced 
later by name.
- **terrains:** A list of terrains and their properties to be referenced 
later by name. 
- **maps:** A list of maps and their properties sto be referenced later by name.
- **overlays:** A list of overlays and their properties to be referenced 
later by name.
- **columns:** The number of tiles along the x-axis to be created.
- **rows:** The number of tiles along the y-axis to be created.
- **tiles:** The rules to generate tiles, their environment, and their 
inhabitants. 
- **scripts:** Conditionals and actions to be evaluated at a set interval 
and at a particular point in time; executed if the conditions are true.