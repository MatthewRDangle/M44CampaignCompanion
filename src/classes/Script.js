export default class Script {
    constructor(script) {
        this.scenarioDefinition = undefined;

        this.name = undefined;
        this.type = undefined;
        this.factions = [];
        this.conditions = [];
        this.onSuccess = undefined;
        this.onFailure = undefined;

        if (!!script) this.compile(script);
    }

    compile(script) {
        try {
            this.name = script.name ?? "";
            this.type = script.type ?? "";

            if (!!this.factions) {
                this.factions = script.factions.map(
                    name => this.scenarioDefinition.factions[name]
                );
            }

            if (!!script.conditions) {
                this.conditions = script.conditions.map(
                    condition => {
                        condition.bind(this.scenarioDefinition);
                        return condition;
                    }
                );
            }

            if (!!script.onSuccess) {
                this.onSuccess = script.onSuccess;
                this.onSuccess.bind(this.scenarioDefinition);
            }

            if (!!script.onFailure) {
                this.onFailure = script.onFailure;
                this.onFailure.bind(this.scenarioDefinition);
            }
        } catch (err) { console.error(err) }
    }

    evaluate() {
        const isSuccess = this.conditions
            .map((condition) => {
                let conditionsMet = false;
                try {
                    conditionsMet = condition();
                } catch(e) { console.error(e) }

                return !!conditionsMet ? 0 : 1;
            })
            .reduce((sum, cv) => sum + cv, 0);

        return isSuccess === 0;
    }

    execute() {
        const isSuccess = this.evaluate();
        if (isSuccess && !!this.onSuccess)
            this.onSuccess()
        if (!isSuccess && !!this.onFailure)
            this.onFailure()
    }
}