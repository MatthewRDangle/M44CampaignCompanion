const path = require('path');

import {recursiveReaddir, appDir} from "../utilities/readdir.js";

export const routeService = {
    getAll: () => {
        return new Promise(async (resolve) => {
            const location = path.join(appDir, 'gui', 'pages');
            resolve(await recursiveReaddir(location));
        });
    }
}