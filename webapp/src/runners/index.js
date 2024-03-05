import faction_occupies_tile from "./conditions/factionOccupiesTile.js";
import is_faction_turn from "./conditions/isFactionTurn.js";
import is_turn_number from "./conditions/isTurnNumber.js";
import create_new_unit_on_tile from "./then/createNewUnitOnTile.js"
import victory_for_faction from "./then/victoryForFaction.js";
import failure_for_faction from "./then/failureForFaction.js";


export default {
    conditions: {
        "faction_occupies_tile": faction_occupies_tile,
        "is_faction_turn": is_faction_turn,
        "is_turn_number": is_turn_number,
    },
    then: {
        "create_new_unit_on_tile": create_new_unit_on_tile,
        "victory_for_faction": victory_for_faction,
        "failure_for_faction": failure_for_faction,
    }
}