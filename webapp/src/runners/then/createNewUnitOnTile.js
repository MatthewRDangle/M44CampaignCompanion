import Unit from "../../models/scenario/Unit.model";

export default ({unit_template, faction, tile}) => {
    const newUnit = new Unit(faction, unit_template)
    tile.addUnit(newUnit)
}