// Credit to MultiplyByZer0: Accessed, 2/15/2023
// (https://stackoverflow.com/questions/42966641/how-to-transform-black-into-any-given-color-using-only-css-filters/43960991#43960991)
import Color from "../classes/Color.js";
import ColorSolver from "../classes/ColorSolver.js";
import {hexToRgb} from "./hexToRGB.js";


export function hexToSVGFilter(hex) {
    const rgb = hexToRgb(hex);
    const color = new Color(rgb[0], rgb[1], rgb[2]);
    const solver = new ColorSolver(color);
    const result = solver.solve();
    return result.filter.inline;
}

export const whiteSVGFilter = hexToSVGFilter('#FFFFFF');