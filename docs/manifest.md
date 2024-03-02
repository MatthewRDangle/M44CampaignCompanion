> **Alert:** This is an alpha release. It may be inaccurate and may change in an upcoming release.

# Manifest
The manifest is a cached introduction point for your scenario. It contains all the 
information and references for your scenario to load at runtime.

In BattleCry, the Manifest lies at head of your scenario and contains all 
references and metadata to load all resources and enable all interactions.

The Manifest has plays the following roles:

- **Relays the scenario overview to the user**. When the user is selecting
which scenario to play the application relies on the manifest to provide
brief description information to assist in the selection process.
- **Reference scenario definitions.** When the user selects a scenario to 
play, the application uses the paths to dynamically import the scenario
definitions.
- **Updating scenarios**. When updating the scenario, the internal version 
and id metadata is used to assist them during the update process. It can prevent
the user from reverting to an older version, to updating to an 
incompatible version.

## Model
    format_version: number [Required]
    UUID: uuid [Required]
    version: string [Required]
    scenarioDefinition: string [Required]
    name: string [Required]
    factions: array<string> [Required]
    size: object [Required]
        columns: number [Required]
        rows: number [Required]

- **format_version:** Tells the engine which version of to the definition 
api to use to read the contents.
- **UUID:** The unique identifier for your scenario.
- **version:** The scenario version used to handle updating.
- **scenarioDefinition:** The relative path to the main definition file. 
Use the relative path starting with the parent directory containing the 
manifest. 
- **name:** The display friendly name for your scenario. 
- **factions:** The display friendly name for factions part of the scenario.
- **size:** An object used to display a friendly scenario grid size.

## Example
The following is an example of the manifest file in yml format.

    ---
    format_version: 1
    UUID: 2b9621ba-1463-4258-ae68-b9d74be8dadb
    version: 1.0.0
    scenarioDefinition: definitions.yml
    name: The Crowded Pocket
    factions: 
        - Union
        - Uprising
    size:
        columns: 27
        rows: 22
    ...