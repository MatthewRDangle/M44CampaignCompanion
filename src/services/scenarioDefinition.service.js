const {ipcRenderer} = require('electron');


export const scenarioDefinitionService = {
    getFileContent: async (path) => {
        return await ipcRenderer.invoke("/api/systemFiles/getFileContent", path)
    }
}