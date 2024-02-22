export default class TableControllerBuilder {
    rawData = []
    rules = {}
    columns = []
    rows = []

    constructor(data) {
        this.use(data)
    }

    use(data) {
        if (Array.isArray(data)) this.data = data;
    }

    handle(key, as, config) {
        const { as, handleValue } = config;
        const tmpRule = { key, as, handleValue }
        const rule = this.rules[key];
        this.rules[key] = {
            ...rule,
            tmpRule
        }
    }

    build() {
        this.columns = this.rules.map((item) => item.key);
        this.rows = this.rawData.map(rawData => {
            return this.rules.map(item => {
                const value = rawData[item.key];
                return item.handleValue ? item.handleValue(value) : value
            })
        })
    }
}