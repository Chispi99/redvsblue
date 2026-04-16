import Character from './Character.js';

export default class Pokemon extends Character {
    constructor(name, level, health, pp) {
        super(name, level, health);
        this.pp = pp;
    }

    attack(target) {
        const damage = Math.floor(Math.random() * 5) + 5;
        target.takeDamage(damage);
        return {
            message: `${this.name} usó Placaje!`,
            damage: damage
        };
    }
}
