import Faction from "../../models/scenario/Faction.js";
import Tile from "../../models/scenario/Tile.js";


export default ({faction, tile}) => {
    if (faction instanceof Faction && tile instanceof Tile) {
        let isOwner = false;
        try {
            isOwner = tile.owner === faction;
        } catch(err) { console.log(err) }

        return isOwner;
    }
}