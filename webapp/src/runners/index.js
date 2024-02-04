import faction_owns_tile from "./conditions/factionOwnsTile.js";
import faction_owns_tiles from "./conditions/factionOwnsTiles.js";
import victory from "./then/victory.js";
import failure from "./then/failure.js";


export default {
    conditions: {
        "faction_owns_tile": faction_owns_tile,
        "faction_owns_tiles": faction_owns_tiles
    },
    then: {
        "victory": victory,
        "failure": failure
    }
}