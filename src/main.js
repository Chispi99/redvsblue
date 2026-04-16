import FirePokemon from './FirePokemon.js';
import WaterPokemon from './WaterPokemon.js';
import Game from './Game.js';

document.addEventListener('DOMContentLoaded', () => {
    const logBox = document.getElementById('log');
    const attackBtn = document.getElementById('btn-attack');
    const abilityBtn = document.getElementById('btn-ability');
    
    const playerHealth = document.getElementById('player-health');
    const playerMaxHealth = document.getElementById('player-max-health');
    const playerHealthBar = document.getElementById('player-health-bar');
    const playerPP = document.getElementById('player-pp');
    
    const enemyHealth = document.getElementById('enemy-health');
    const enemyMaxHealth = document.getElementById('enemy-max-health');
    const enemyHealthBar = document.getElementById('enemy-health-bar');
    const enemyPP = document.getElementById('enemy-pp');

    const uiController = {
        logMessage: (msg) => {
            logBox.innerHTML += `<p>${msg}</p>`;
            logBox.scrollTop = logBox.scrollHeight;
        },
        updateStatus: (player, enemy) => {
            playerHealth.innerText = player.health;
            playerMaxHealth.innerText = player.maxHealth;
            playerPP.innerText = player.pp;
            playerHealthBar.style.width = `${(player.health / player.maxHealth) * 100}%`;
            
            enemyHealth.innerText = enemy.health;
            enemyMaxHealth.innerText = enemy.maxHealth;
            enemyPP.innerText = enemy.pp;
            enemyHealthBar.style.width = `${(enemy.health / enemy.maxHealth) * 100}%`;
        },
        enableButtons: (enabled) => {
            attackBtn.disabled = !enabled;
            abilityBtn.disabled = !enabled;
        }
    };

    const charmander = new FirePokemon('Charmander', 5, 39, 35);
    const squirtle = new WaterPokemon('Squirtle', 5, 44, 40);

    abilityBtn.innerText = "Ascuas (PP: 5)";

    const game = new Game(charmander, squirtle, uiController);
    game.start();

    attackBtn.addEventListener('click', () => {
        game.playerAction('attack');
    });

    abilityBtn.addEventListener('click', () => {
        game.playerAction('ability');
    });
});
