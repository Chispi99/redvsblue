export default class UIController {
    constructor(logBox, playerElements, enemyElements, buttons) {
        this.logBox = logBox;
        this.player = playerElements;
        this.enemy = enemyElements;
        this.buttons = buttons;
    }

    logMessage(msg) {
        this.logBox.innerHTML = msg;
    }

    updateStatus(player, enemy) {
        this.player.health.innerText = player.health;
        this.player.maxHealth.innerText = player.maxHealth;
        this.player.healthBar.style.width = `${(player.health / player.maxHealth) * 100}%`;

        this.player.name.innerText = player.name.toUpperCase() + (player.isShiny ? ' ★' : '');
        this.enemy.name.innerText = enemy.name.toUpperCase() + (enemy.isShiny ? ' ★' : '');

        this.enemy.health.innerText = enemy.health;
        this.enemy.maxHealth.innerText = enemy.maxHealth;
        this.enemy.healthBar.style.width = `${(enemy.health / enemy.maxHealth) * 100}%`;
    }

    enableButtons(enable) {
        this.buttons.attack.disabled = !enable;
        this.buttons.ability.disabled = !enable;
        this.buttons.bag.disabled = !enable;
        this.buttons.run.disabled = !enable;
    }
}
