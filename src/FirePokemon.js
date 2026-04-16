import Pokemon from './Pokemon.js';

export default class FirePokemon extends Pokemon {
    constructor(name, level, health, pp) {
        super(name, level, health, pp);
        this.type = 'Fire';
    }

    useAbility(target) {
        if (this.pp >= 5) {
            this.pp -= 5;
            const damage = Math.floor(Math.random() * 10) + 10;
            target.takeDamage(damage);
            
            let effectMsg = '';
            if (target.type === 'Water') {
                effectMsg = ' ¡No es muy efectivo...!';
            } else if (target.type === 'Grass') {
                effectMsg = ' ¡Es súper efectivo!';
            }

            return {
                message: `${this.name} usó Ascuas!${effectMsg}`,
                damage: damage
            };
        } else {
            return {
                message: `${this.name} intentó usar Ascuas pero no tiene más PP.`,
                damage: 0
            };
        }
    }
}
