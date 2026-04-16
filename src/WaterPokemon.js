import Pokemon from './Pokemon.js';

export default class WaterPokemon extends Pokemon {
    constructor(name, level, health, pp) {
        super(name, level, health, pp);
        this.type = 'Water';
    }

    useAbility(target) {
        if (this.pp >= 5) {
            this.pp -= 5;
            const damage = Math.floor(Math.random() * 10) + 10;
            target.takeDamage(damage);

            let effectMsg = '';
            if (target.type === 'Fire') {
                effectMsg = ' ¡Es súper efectivo!';
            } else if (target.type === 'Water') {
                effectMsg = ' ¡No es muy efectivo...!';
            }

            return {
                message: `${this.name} usó Burbuja!${effectMsg}`,
                damage: damage
            };
        } else {
            return {
                message: `${this.name} intentó usar Burbuja pero no tiene más PP.`,
                damage: 0
            };
        }
    }
}
