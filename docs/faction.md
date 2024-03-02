> **Alert:** This is an alpha release. It may be inaccurate and may change in an upcoming release.

# Faction
The faction represents the side the player is fighting on behalf for 
the conflict of a scenario. They're vital for reinforcing the theme. 

A faction plays the following roles:
- **Immersion:** Vital for reinforcing the theme set forth by the scenario.
- **Playability:** Acts as the controller for the player to interact 
with other factions.

## Model
    name: string [Required]
    color: Color [Optional]
    flag: Image [Optional]
    icon: Image [Optional]

- **Name:** The text reference to be used later for import.
- **Color:** The color that will be applied to represent this faction.
- **Flag:** An factions flag. Used mostly by the UI for a visual representation of the faction.
- **Icon** An icon for the faction to be display where a flag isn't possible.

## Example
    ---
    name: USSR
    color:
        text: "#FDB221"
        background: "#CC0000"
    flag:
        src: lib/flags/ussr_flag.png
        alt: ''
    icon:
        src: lib/icons/ussr_icon.png
        alt: ''
    ...