import Pokemon from './Pokemon.js';
import Move from './Move.js';

export default class GrassPokemon extends Pokemon {
    constructor(name, level, health) {
        super(name, level, health);
        this.type = 'Planta';
        this.ability = 'Espesura';
        this.moves = [
            new Move('Placaje', 'Normal', 8, 35),
            new Move('Gruñido', 'Normal', 0, 40),
            new Move('Látigo Cepa', 'Planta', 15, 25)
        ];
    }

    useAbility(target) {
        return { message: `${this.name} activa su habilidad ${this.ability}!` };
    }
}
