import faction_owns_tile from "./conditions/faction_owns_tile.js";
import victory from "./then/victory.js";
import failure from "./then/failure.js";


export default {
    conditions: {
        "faction_owns_tile": faction_owns_tile
    },
    then: {
        "victory": victory,
        "failure": failure
    }
}