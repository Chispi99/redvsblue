export default class Game {
    constructor(playerPokemon, enemyPokemon, uiController) {
        this.player = playerPokemon;
        this.enemy = enemyPokemon;
        this.ui = uiController;
        this.turn = 'player';
        this.inventory = [
            { name: 'Poción', type: 'heal', amount: 20, count: 3 }
        ];
    }

    start() {
        this.ui.updateStatus(this.player, this.enemy);
        this.ui.logMessage(`¡Un SQUIRTLE salvaje apareció!`);
        setTimeout(() => {
            this.ui.logMessage(`¡Ve, CHARMANDER!`);
            this.ui.enableButtons(true);
        }, 1500);
    }

    playerAction(actionType, actionIndex = 0) {
        if (this.turn !== 'player' || !this.player.isAlive) return;
        
        let result;
        if (actionType === 'move') {
            result = this.player.useMove(actionIndex, this.enemy);
            if (!result.success) {
                this.ui.logMessage(result.message);
                return;
            }
        } else if (actionType === 'item') {
            const item = this.inventory[actionIndex];
            if (item && item.count > 0) {
                if (item.type === 'heal') {
                    if (this.player.health === this.player.maxHealth) {
                        this.ui.logMessage(`¡${this.player.name} ya tiene<br>la salud al máximo!`);
                        return; 
                    }
                    this.player.heal(item.amount);
                    item.count -= 1;
                    result = { message: `Usaste ${item.name}.<br>¡${this.player.name} recuperó PS!` };
                }
            } else {
                result = { message: '¡No tienes más de este objeto!' };
            }
        } else if (actionType === 'run') {
            result = { message: '¡No puedes huir de un<br>combate de entrenador!' };
        } else if (actionType === 'pokemon') {
            result = { message: '¡No te quedan otros<br>Pokémon en forma!' };
        }

        this.ui.logMessage(result.message);
        this.ui.updateStatus(this.player, this.enemy);

        if (!this.enemy.isAlive) {
            this.endGame(this.player.name);
            return;
        }

        this.turn = 'enemy';
        this.ui.enableButtons(false);

        setTimeout(() => this.enemyAction(), 2000);
    }

    enemyAction() {
        if (!this.enemy.isAlive) return;

        const validMoves = this.enemy.moves.map((m, i) => i).filter(i => this.enemy.moves[i].pp > 0);
        
        if (validMoves.length === 0) {
            this.ui.logMessage(`¡${this.enemy.name} no tiene<br>movimientos útiles!`);
        } else {
            const moveIndex = validMoves[Math.floor(Math.random() * validMoves.length)];
            const result = this.enemy.useMove(moveIndex, this.player);
            this.ui.logMessage(`Enemigo ${result.message}`);
        }

        this.ui.updateStatus(this.player, this.enemy);

        if (!this.player.isAlive) {
            this.endGame(this.enemy.name);
            return;
        }

        this.turn = 'player';
        this.ui.enableButtons(true);
    }

    endGame(winner) {
        this.ui.logMessage(`¡El combate ha terminado!<br>${winner} es el ganador.`);
        this.ui.enableButtons(false);
    }
}
