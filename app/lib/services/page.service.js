const path = require('path');
import {recursiveReaddir} from "../utilities/readdir.js";


export const pageService = {
    getAll: () => {
        return new Promise(async (resolve) => {
            const location = path.join(__dirname, 'lib', 'pages');
            resolve(await recursiveReaddir(location));
        });
    }
}