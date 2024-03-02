> **Alert:** This is an alpha release. It may be inaccurate and may change in an upcoming release.

# Tile
Logic to contain all of various definition.

## Model
    terrain: string [Optional]
    map: string [Optional]
    overlays: Array<string> [Optional]
    units: Object<Faction Name, Array<string>> [Optional]
    setup: Setup [Optional]

- **Terrain:** Use the terrain name to import a terrain. 
- **Map:** Use the map name to import a map.
- **Overlays:** Use overlay names to import one or multiple overlays.
- **Units:** An object that uses a faction name as the key with an array 
of unit references. 

## Example
    ---
    terrain: Forest
    battleMap: Forest
    overlays:
        - Forest Alt 1
    units:
      Germany:
        - Infantry
        - Infantry
    ...