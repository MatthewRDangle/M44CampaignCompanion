import {hexToSVGFilter} from '../utilities/hexToSVGFilter.js';


export default class Faction {
    constructor(name) {

        this.name = name ?? 'Unknown';
        this.color = {
            text: '#000000',
            background: '#FFFFFF',
        };
        this.filter = {
            text: 'brightness(0) saturate(100%)' + hexToSVGFilter(this.color.text),
            background: 'brightness(0) saturate(100%)' + hexToSVGFilter(this.color.background)
        }
        this.currentTurn = false;
        this.gameOverMessage = undefined;
    }

    compile(definition) {
        if (!definition.name)
            throw Error('Unable to create faction without a name.');
        this.name = definition.name;
        this.currentTurn = definition.currentTurn || false;
        this.color = {
            text: definition?.color?.text || '#000000',
            background: definition?.color?.background || '#FFFFFF',
        };
        this.filter = {
            text: 'brightness(0) saturate(100%)' + hexToSVGFilter(definition?.color?.text),
            background: 'brightness(0) saturate(100%)' + hexToSVGFilter(definition?.color?.background)
        }
    }

    isVictorious() {
        this.gameOverMessage = "Victorious";
    }

    isDefeated () {
        this.gameOverMessage = "Defeated";
    }
}