export default class Character {
    constructor(name, level, health) {
        this.name = name;
        this.level = level;
        this.maxHealth = health;
        this.health = health;
        this.isAlive = true;
    }

    takeDamage(amount) {
        this.health -= amount;
        if (this.health <= 0) {
            this.health = 0;
            this.isAlive = false;
        }
        return amount;
    }
}
