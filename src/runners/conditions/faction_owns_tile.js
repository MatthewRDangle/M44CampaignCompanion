import Faction from "../../classes/Faction.js";
import Tile from "../../classes/Tile.js";


export default ({faction, tile}) => {
    if (faction instanceof Faction && tile instanceof Tile) {
        let isOwner = false;
        try {
            isOwner = tile.owner === faction;
        } catch(err) { console.log(err) }

        return isOwner;
    }
}