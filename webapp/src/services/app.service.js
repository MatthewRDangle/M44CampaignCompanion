const { api } = window;

export const appService = {
    getAppPath: async () => {
        return await api.handle('/application/path');
    },

    quit: () => {
        api.handle('/application/quit');
    }
}