import Character from './Character.js';

export default class Pokemon extends Character {
    constructor(name, level, health) {
        super(name, level, health);
        this.moves = [];
        this.ability = '';
        this.isShiny = Math.random() < (10 / 64);
        this.assignRandomNature();
    }

    assignRandomNature() {
        const natures = [
            { name: 'Fuerte', buff: null, nerf: null },
            { name: 'Huraña', buff: 'attack', nerf: 'defense' },
            { name: 'Audaz', buff: 'attack', nerf: 'speed' },
            { name: 'Firme', buff: 'attack', nerf: 'special-attack' },
            { name: 'Pícara', buff: 'attack', nerf: 'special-defense' },
            { name: 'Osada', buff: 'defense', nerf: 'attack' },
            { name: 'Dócil', buff: null, nerf: null },
            { name: 'Plácida', buff: 'defense', nerf: 'speed' },
            { name: 'Agitada', buff: 'defense', nerf: 'special-attack' },
            { name: 'Floja', buff: 'defense', nerf: 'special-defense' },
            { name: 'Miedosa', buff: 'speed', nerf: 'attack' },
            { name: 'Activa', buff: 'speed', nerf: 'defense' },
            { name: 'Seria', buff: null, nerf: null },
            { name: 'Alegre', buff: 'speed', nerf: 'special-attack' },
            { name: 'Ingenua', buff: 'speed', nerf: 'special-defense' },
            { name: 'Modesta', buff: 'special-attack', nerf: 'attack' },
            { name: 'Afable', buff: 'special-attack', nerf: 'defense' },
            { name: 'Mansa', buff: 'special-attack', nerf: 'speed' },
            { name: 'Tímida', buff: null, nerf: null },
            { name: 'Alocada', buff: 'special-attack', nerf: 'special-defense' },
            { name: 'Serena', buff: 'special-defense', nerf: 'attack' },
            { name: 'Amable', buff: 'special-defense', nerf: 'defense' },
            { name: 'Grosera', buff: 'special-defense', nerf: 'speed' },
            { name: 'Cauta', buff: 'special-defense', nerf: 'special-attack' },
            { name: 'Rara', buff: null, nerf: null }
        ];

        this.nature = natures[Math.floor(Math.random() * natures.length)];
        this.atkMultiplier = 1;
        this.defMultiplier = 1;

        if (this.nature.buff === 'attack' || this.nature.buff === 'special-attack') this.atkMultiplier = 1.1;
        if (this.nature.buff === 'defense' || this.nature.buff === 'special-defense') this.defMultiplier = 1.1;
        
        if (this.nature.nerf === 'attack' || this.nature.nerf === 'special-attack') this.atkMultiplier = 0.9;
        if (this.nature.nerf === 'defense' || this.nature.nerf === 'special-defense') this.defMultiplier = 0.9;
    }

    useMove(moveIndex, target) {
        const move = this.moves[moveIndex];
        
        if (move.pp <= 0) {
            return {
                message: `¡${this.name} no tiene más<br>PP para ${move.name}!`,
                success: false
            };
        }

        move.pp -= 1;
        let damage = 0;
        let effectMsg = '';

        if (move.power > 0) {
            damage = Math.floor(move.power * this.atkMultiplier * (Math.random() * 0.2 + 0.9));
            
            const isLowHP = this.health <= this.maxHealth / 3;
            let abilityMsg = '';
            
            if (isLowHP) {
                if ((this.ability === 'Mar Llamas' && move.type === 'Fuego') ||
                    (this.ability === 'Torrente' && move.type === 'Agua') ||
                    (this.ability === 'Espesura' && move.type === 'Planta')) {
                    damage = Math.floor(damage * 1.5);
                    abilityMsg = `<br>¡${this.ability} de ${this.name}<br>aumentó su poder!`;
                }
            }

            // Simple type multipliers
            const advantageMsg = '<br>¡Es súper efectivo!';
            const disadvantageMsg = '<br>¡No es muy efectivo...!';

            if (move.type === 'Fuego') {
                if (target.type === 'Agua') { damage = Math.floor(damage / 2); effectMsg = disadvantageMsg; }
                if (target.type === 'Planta') { damage = damage * 2; effectMsg = advantageMsg; }
            } else if (move.type === 'Agua') {
                if (target.type === 'Planta') { damage = Math.floor(damage / 2); effectMsg = disadvantageMsg; }
                if (target.type === 'Fuego') { damage = damage * 2; effectMsg = advantageMsg; }
            } else if (move.type === 'Planta') {
                if (target.type === 'Fuego') { damage = Math.floor(damage / 2); effectMsg = disadvantageMsg; }
                if (target.type === 'Agua') { damage = damage * 2; effectMsg = advantageMsg; }
            }
            
            target.takeDamage(Math.floor(damage / target.defMultiplier));
            effectMsg = abilityMsg + effectMsg; 
        } else {
            if (move.name === 'Gruñido' || move.name === 'Látigo') {
                effectMsg = `<br>¡El ataque de ${target.name}<br>bajó!`;
            } else {
                effectMsg = `<br>Pero no pasó nada...`;
            }
        }

        return {
            message: `¡${this.name} usó ${move.name}!${effectMsg}`,
            success: true
        };
    }
}
