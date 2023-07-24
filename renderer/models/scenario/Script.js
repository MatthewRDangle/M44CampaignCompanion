import runners from "../../runners/index.js";
import Runner from "./Runner.js";


export default class Script {
    constructor(scenarioDefinition) {
        this.scenarioDefinition = scenarioDefinition;

        this.interval = 1;

        this.when = "end_of_turn";
        this.conditions = [];
        this.then = {
            onSuccess: undefined,
            onFailure: undefined,
        }
    };

    compile(rawScript) {
        try {
            if (!Number.isInteger(rawScript.interval))
                this.interval = rawScript.interval;

            if (typeof rawScript.when === 'string')
                this.when = rawScript.when;

            this.conditions = [];
            for (let rawRunner of rawScript.conditions) {
                const runner = new Runner(this.scenarioDefinition);
                runner.compile(runners.conditions[rawRunner.name], rawRunner.params);
                this.conditions.push(runner);
            }

            if (!!rawScript?.then?.onSuccess) {
                this.then.onSuccess = [];
                for (let rawRunner of rawScript.then.onSuccess) {
                    const runner = new Runner(this.scenarioDefinition);
                    runner.compile(runners.then[rawRunner.name], rawRunner.params);
                    this.then.onSuccess.push(runner);
                }
            } else this.then.onSuccess = undefined;

            if (!!rawScript?.then?.onFailure) {
                this.then.onFailure = [];
                for (let rawRunner of rawScript.then.onFailure) {
                    const runner = new Runner(this.scenarioDefinition);
                    runner.compile(runners.then[rawRunner.name], rawRunner.params);
                    this.then.onFailure.push(runner);
                }
            } else this.then.onFailure = undefined;
        } catch (err) { console.error(err) }
    }

    evaluate() {
        const isSuccess = this.conditions
            .map((runner) => {
                let conditionsMet = false;
                try {
                    conditionsMet = runner.run();
                } catch(e) { console.error(e) }

                return !!conditionsMet ? 0 : 1;
            })
            .reduce((sum, cv) => sum + cv, 0);

        return isSuccess === 0;
    }

    run() {
        const isSuccess = this.evaluate();
        if (isSuccess && !!this.then.onSuccess)
            this.then.onSuccess.forEach(runner => runner.run())
        if (!isSuccess && !!this.then.onFailure)
            this.then.onFailure.forEach(runner => runner.run())
    }
}