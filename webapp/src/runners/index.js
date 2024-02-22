import faction_owns_tile from "./conditions/factionOwnsTile.js";
import faction_owns_tiles from "./conditions/factionOwnsTiles.js";
import is_factions_turn from "./conditions/isFactionsTurn.js";
import is_turn_number from "./conditions/isTurnNumber.js";
import victory_for_faction from "./then/victoryForFaction.js";
import failure_for_faction from "./then/failureForFaction.js";


export default {
    conditions: {
        "faction_owns_tile": faction_owns_tile,
        "faction_owns_tiles": faction_owns_tiles,
        "is_factions_turn": is_factions_turn,
        "is_turn_number": is_turn_number,
    },
    then: {
        "victory_for_faction": victory_for_faction,
        "failure_for_faction": failure_for_faction,
    }
}