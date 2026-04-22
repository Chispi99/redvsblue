import Pokemon from './Pokemon.js';

export default class WaterPokemon extends Pokemon {
    constructor(name, level, health) {
        super(name, level, health);
        this.type = 'Agua';
        this.ability = 'Torrente';
        this.moves = [
            { name: 'Placaje', type: 'Normal', power: 8, pp: 35, maxPP: 35 },
            { name: 'Látigo', type: 'Normal', power: 0, pp: 30, maxPP: 30 },
            { name: 'Burbuja', type: 'Agua', power: 15, pp: 30, maxPP: 30 }
        ];
    }
}
