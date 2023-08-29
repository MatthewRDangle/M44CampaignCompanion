import Faction from "../../models/scenario/Faction.model.js";
import Tile from "../../models/scenario/Tile.model.js";


export default ({faction, tile}) => {
    if (faction instanceof Faction && tile instanceof Tile) {
        let isOwner = false;
        try {
            isOwner = tile.occupied_by === faction;
        } catch(err) { console.log(err) }

        return isOwner;
    }
}