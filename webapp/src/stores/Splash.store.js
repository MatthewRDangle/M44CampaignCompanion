let splashStore;

class SplashStore {
    isLoaded = false;

    constructor() {
        if (!splashStore) {
            return this;
        } else
            return splashStore;
    }
}

splashStore = new SplashStore();
export default splashStore;