import Pokemon from './Pokemon.js';
import Move from './Move.js';

export default class FirePokemon extends Pokemon {
    constructor(name, level, health) {
        super(name, level, health);
        this.type = 'Fuego';
        this.ability = 'Mar Llamas';
        this.moves = [
            new Move('Arañazo', 'Normal', 8, 35),
            new Move('Gruñido', 'Normal', 0, 40),
            new Move('Ascuas', 'Fuego', 15, 25)
        ];
    }

    useAbility(target) {
        return { message: `${this.name} activa su habilidad ${this.ability}!` };
    }
}
