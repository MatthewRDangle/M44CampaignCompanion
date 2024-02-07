const { api } = window;

export const systemService = {
    getFileContent: async (path) => {
        return await api.handle('system/getFileContent', path);
    }
}