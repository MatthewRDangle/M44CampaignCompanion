> **Alert:** This is an alpha release. It may be inaccurate and may change in an upcoming release.

# Setup
The setup api provides instructions for how to set up the battle.

## Model
    name: string [Required]
    title: string [Required]
    instructions: Array<string> [Required]

- **Name:** The text reference to be used later for import.
- **Title:** The display title for the page.
- **Instructions:** An array of text to display on the battle setup page. 
Each item in the array is rendered as a paragraph with space between. 

## Example
    ---
    name: Battle Setup
    title: Skirmish
    instructions:
        - Defenders set up defence first. Then the attackers place their units. Now fight!
    ...