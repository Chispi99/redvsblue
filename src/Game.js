export default class Game {
    constructor(playerPokemon, enemyPokemon, uiController) {
        this.player = playerPokemon;
        this.enemy = enemyPokemon;
        this.ui = uiController;
        this.turn = 'player';
    }

    start() {
        this.ui.updateStatus(this.player, this.enemy);
        this.ui.logMessage(`¡Un ${this.enemy.name} salvaje apareció!`);
        this.ui.logMessage(`¡Ve, ${this.player.name}!`);
        this.ui.enableButtons(true);
    }

    playerAction(actionType) {
        if (this.turn !== 'player' || !this.player.isAlive) return;
        
        let result;
        if (actionType === 'attack') {
            result = this.player.attack(this.enemy);
        } else if (actionType === 'ability') {
            result = this.player.useAbility(this.enemy);
        }

        this.ui.logMessage(result.message);
        this.ui.updateStatus(this.player, this.enemy);

        if (!this.enemy.isAlive) {
            this.endGame(this.player.name);
            return;
        }

        this.turn = 'enemy';
        this.ui.enableButtons(false);

        setTimeout(() => this.enemyAction(), 1500);
    }

    enemyAction() {
        if (!this.enemy.isAlive) return;

        const actionType = Math.random() > 0.5 ? 'attack' : 'ability';
        let result;
        if (actionType === 'attack') {
            result = this.enemy.attack(this.player);
        } else {
            result = this.enemy.useAbility(this.player);
        }

        this.ui.logMessage(`Enemigo ${result.message}`);
        this.ui.updateStatus(this.player, this.enemy);

        if (!this.player.isAlive) {
            this.endGame(this.enemy.name);
            return;
        }

        this.turn = 'player';
        this.ui.enableButtons(true);
    }

    endGame(winner) {
        this.ui.logMessage(`¡El combate ha terminado! ${winner} es el ganador.`);
        this.ui.enableButtons(false);
    }
}
