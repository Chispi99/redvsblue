import Pokemon from './Pokemon.js';
import Move from './Move.js';

export default class WaterPokemon extends Pokemon {
    constructor(name, level, health) {
        super(name, level, health);
        this.type = 'Agua';
        this.ability = 'Torrente';
        this.moves = [
            new Move('Placaje', 'Normal', 8, 35),
            new Move('Látigo', 'Normal', 0, 30),
            new Move('Burbuja', 'Agua', 15, 30)
        ];
    }

    useAbility(target) {
        return { message: `${this.name} activa su habilidad ${this.ability}!` };
    }
}
