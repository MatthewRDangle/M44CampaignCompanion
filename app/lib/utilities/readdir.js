const fs = require ("fs");
const path = require ("path");

export const recursiveReaddir = (dir) => {
    if (!dir)
        return

    return new Promise(resolve => {
        const fileNames = [];
        fs.readdir(dir, async (error, tmpFilesNames) => {
            for (const name of tmpFilesNames) {
                const location = path.join(dir, name);
                const stats = await fs.statSync(location);

                if (stats.isDirectory())
                    fileNames.concat(await recursiveReaddir(location))
                else
                    fileNames.push(location);
            }

            resolve(fileNames);
        })
    })
}