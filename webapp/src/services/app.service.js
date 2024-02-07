const { api } = window;

export const appService = {
    getAppPath: async () => {
        return await api.handle('app/path');
    },

    quit: () => {
        api.handle('app/quit');
    }
}