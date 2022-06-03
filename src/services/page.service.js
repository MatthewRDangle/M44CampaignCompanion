const path = require('path');

import {recursiveReaddir} from "../utilities/readdir.js";
import {appDir} from '../utilities/readdir.js';


export const pageService = {
    getAll: () => {
        return new Promise(async (resolve) => {
            const location = path.join(appDir, 'src', 'pages');
            resolve(await recursiveReaddir(location));
        });
    }
}