> **Alert:** This is an alpha release. It may be inaccurate and may change in an upcoming release.

# Script
Scripts allow the game to react to gameplay and make changes while playing.

## Model
    interval: number [Optional]
    when: string [Optional]
    conditions: Array<Runner> [Required]
    onSuccess: Array<Runner> [Optional]
    onFailure: Array<Runner> [Optional]
  

- **Interval:** The frequency the script should execute.
- **When:** The gameplay hook for the script to execute.
- **Conditions:** An array of predefined runners to evaluate.
- **On Success:** An array of predefined runners to execute if the condition is true.
- **On Failure:** An array of predefined runners to execute if the condition is false.

## Example
    ---
    name: USSR
    color:
        text: "#FDB221"
        background: "#CC0000"
    ...