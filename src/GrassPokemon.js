import Pokemon from './Pokemon.js';

export default class GrassPokemon extends Pokemon {
    constructor(name, level, health) {
        super(name, level, health);
        this.type = 'Planta';
        this.ability = 'Espesura';
        this.moves = [
            { name: 'Placaje', type: 'Normal', power: 8, pp: 35, maxPP: 35 },
            { name: 'Gruñido', type: 'Normal', power: 0, pp: 40, maxPP: 40 },
            { name: 'Látigo Cepa', type: 'Planta', power: 15, pp: 25, maxPP: 25 }
        ];
    }
}
