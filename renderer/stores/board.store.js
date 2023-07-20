import definitionStore from "./definition.store.js"

let boardStore;

class BoardStore {
    hexSize = 200;
    hexMargin = 1;
    rowEvenOffset = this.hexSize / 2 + this.hexMargin;
    width = 0
    height = 0
    scale = 0.5
    mouseX = 0
    mouseY = 0
    positionTop = 0
    positionLeft = 0

    constructor() {
        if (!boardStore) {
            this.setScale = this.setScale.bind(this);
            this.setPosition = this.setPosition.bind(this);
            this.setMouse = this.setMouse.bind(this);
            this.resetBoard = this.resetBoard.bind(this);
            return this;
        } else
            return boardStore;
    }

    resetBoard() {
        this.width = this.hexSize * definitionStore.activeScenarioDefinition.columns + this.hexSize / 2 + this.hexMargin * 2 * definitionStore.activeScenarioDefinition.columns
        this.height = this.hexSize * definitionStore.activeScenarioDefinition.rows + this.hexSize / 2 + this.hexMargin * 2 * definitionStore.activeScenarioDefinition.rows
        this.scale = 0.5
        this.mouseX = 0
        this.mouseY = 0
        this.positionTop = -this.height / 3
        this.positionLeft = -this.width / 3
    }

    setScale(delta) {
        if (delta < 0)
            this.scale = this.scale + .01;
        else if (delta > 0) {
            if (!(this.scale <= 0.05))
                this.scale = this.scale - .01;
        }
    }

    setPosition(top, left) {
        this.positionTop = top;
        this.positionLeft = left;
    }

    setMouse(x, y) {
        this.mouseX = x;
        this.mouseY = y;
    }
}

boardStore = new BoardStore();
export default boardStore;