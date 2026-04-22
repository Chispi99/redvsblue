import Pokemon from './Pokemon.js';

export default class FirePokemon extends Pokemon {
    constructor(name, level, health) {
        super(name, level, health);
        this.type = 'Fuego';
        this.ability = 'Mar Llamas';
        this.moves = [
            { name: 'Arañazo', type: 'Normal', power: 8, pp: 35, maxPP: 35 },
            { name: 'Gruñido', type: 'Normal', power: 0, pp: 40, maxPP: 40 },
            { name: 'Ascuas', type: 'Fuego', power: 15, pp: 25, maxPP: 25 }
        ];
    }
}
