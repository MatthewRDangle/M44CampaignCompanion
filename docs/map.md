> **Alert:** This is an alpha release. It may be inaccurate and may change in an upcoming release.

# Map
The map is the game representation of the battlefield the player needs to 
set up and play to determine the outcome of a battle.

## Description
The map is a combination of visuals and text instructions to set up a battle.
The map also acts as the interface to log battle results in the game. The map
plays the following roles:
- **Battle Setup Instructions:** Contains instructions to setup the battlefield
for whatever board game the scenario partakes in.
- **Tactical Gameplay:** Players are forced to battle one another in the map. The
results will be represented in the main game. Players may use maps to put their
units at an advantage for defensive or offensive operations.

## Model
    name: string [Required]
    image: Image [Required]

- **Name:** The name for later reference in the definition api.
- **Image:** An object to reference the path and accessibility text to the file.

## Example
The following is an example of the map in yml format.

    ---
    name: Open Field
    image: 
        src: lib/maps/open_field.png
        alt: placeholder
    ...