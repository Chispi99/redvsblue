import FirePokemon from './FirePokemon.js';
import WaterPokemon from './WaterPokemon.js';
import GrassPokemon from './GrassPokemon.js';
import Game from './Game.js';
document.addEventListener('DOMContentLoaded', () => {
    const logBox = document.getElementById('log');

    const logContainer = document.getElementById('log-container');
    const controlsContainer = document.getElementById('controls-container');
    const movesContainer = document.getElementById('moves-container');

    const attackBtn = document.getElementById('btn-attack');
    const abilityBtn = document.getElementById('btn-ability');
    const bagBtn = document.getElementById('btn-bag');
    const runBtn = document.getElementById('btn-run');

    const movesGrid = document.getElementById('moves-grid');
    const movePpText = document.getElementById('move-pp-text');
    const moveTypeText = document.getElementById('move-type-text');
    const btnCancelMove = document.getElementById('btn-cancel-move');

    const playerHealth = document.getElementById('player-health');
    const playerMaxHealth = document.getElementById('player-max-health');
    const playerHealthBar = document.getElementById('player-health-bar');

    const enemyHealth = document.getElementById('enemy-health');
    const enemyMaxHealth = document.getElementById('enemy-max-health');
    const enemyHealthBar = document.getElementById('enemy-health-bar');

    const uiController = {
        logMessage: (msg) => {
            logBox.innerHTML = msg;
        },
        updateStatus: (player, enemy) => {
            playerHealth.innerText = player.health;
            playerMaxHealth.innerText = player.maxHealth;
            playerHealthBar.style.width = `${(player.health / player.maxHealth) * 100}%`;

            document.getElementById('player-name').innerText = player.name.toUpperCase() + (player.isShiny ? ' ★' : '');
            document.getElementById('enemy-name').innerText = enemy.name.toUpperCase() + (enemy.isShiny ? ' ★' : '');

            enemyHealth.innerText = enemy.health;
            enemyMaxHealth.innerText = enemy.maxHealth;
            enemyHealthBar.style.width = `${(enemy.health / enemy.maxHealth) * 100}%`;
        },
        enableButtons: (enabled) => {
            attackBtn.disabled = !enabled;
            abilityBtn.disabled = !enabled;
            bagBtn.disabled = !enabled;
            runBtn.disabled = !enabled;
        }
    };

    let game;


    const titleScreen = document.getElementById('title-screen');
    const startButton = document.getElementById('btn-start-game');
    const oakScreen = document.getElementById('oak-screen');

    const playerSpriteImg = document.getElementById('player-sprite-img');
    const enemySpriteImg = document.getElementById('enemy-sprite-img');
    const enemyNameUI = document.getElementById('enemy-name');

    startButton.addEventListener('click', () => {
        titleScreen.style.opacity = '0';
        setTimeout(() => {
            titleScreen.style.display = 'none';
            oakScreen.style.display = 'flex';
        }, 500);
    });

    const rivalScreen = document.getElementById('rival-screen');
    const rivalDialog = document.getElementById('rival-dialog');
    const btnChallengeAccept = document.getElementById('btn-challenge-accept');

    const starterBtns = document.querySelectorAll('#oak-screen .btn-starter');
    starterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const chosen = e.target.getAttribute('data-pokemon');
            let playerPoke, enemyPoke;

            if (chosen === 'bulbasaur') {
                playerPoke = new GrassPokemon('Bulbasaur', 5, 45);
                enemyPoke = new FirePokemon('Charmander', 5, 39);
                playerSpriteImg.className = `pokemon sprite-bulba-player${playerPoke.isShiny ? '-shiny' : ''}`;
                enemySpriteImg.className = `pokemon sprite-charm-enemy${enemyPoke.isShiny ? '-shiny' : ''}`;
            } else if (chosen === 'charmander') {
                playerPoke = new FirePokemon('Charmander', 5, 39);
                enemyPoke = new WaterPokemon('Squirtle', 5, 44);
                playerSpriteImg.className = `pokemon sprite-charm-player${playerPoke.isShiny ? '-shiny' : ''}`;
                enemySpriteImg.className = `pokemon sprite-squir-enemy${enemyPoke.isShiny ? '-shiny' : ''}`;
            } else if (chosen === 'squirtle') {
                playerPoke = new WaterPokemon('Squirtle', 5, 44);
                enemyPoke = new GrassPokemon('Bulbasaur', 5, 45);
                playerSpriteImg.className = `pokemon sprite-squir-player${playerPoke.isShiny ? '-shiny' : ''}`;
                enemySpriteImg.className = `pokemon sprite-bulba-enemy${enemyPoke.isShiny ? '-shiny' : ''}`;
            }

            enemyNameUI.innerText = enemyPoke.name.toUpperCase();

            game = new Game(playerPoke, enemyPoke, uiController);


            game.start = function () {

                this.ui.updateStatus(this.player, this.enemy);
                this.ui.logMessage(`¡Azul te desafía!<br>¡Envió a ${this.enemy.name.toUpperCase()}!`);
                setTimeout(() => {
                    this.ui.logMessage(`¡Ve, ${this.player.name.toUpperCase()}!`);
                    this.ui.enableButtons(true);
                }, 2000);
            };

            oakScreen.style.display = 'none';

            rivalDialog.innerText = `¡Je! ¡Pues yo elijo a ${enemyPoke.name.toUpperCase()}! ¡Te voy a destrozar!`;
            rivalScreen.style.display = 'flex';
        });
    });

    btnChallengeAccept.addEventListener('click', () => {
        rivalScreen.style.display = 'none';
        game.start();
    });

    const gameboyFrame = document.getElementById('gameboy-frame');

    const resizeGame = () => {
        const scale = Math.min(window.innerWidth / 600, window.innerHeight / 400);
        gameboyFrame.style.transform = `scale(${scale})`;
    };
    window.addEventListener('resize', resizeGame);
    resizeGame();


    const showMovesMenu = () => {

        if (game.turn !== 'player') return;
        logContainer.style.display = 'none';
        controlsContainer.style.display = 'none';
        movesContainer.style.display = 'flex';

        movesGrid.innerHTML = '';

        game.player.moves.forEach((move, index) => {
            const btn = document.createElement('button');
            btn.className = 'btn';
            btn.innerHTML = `<span>▶</span>${move.name.toUpperCase()}`;

            btn.addEventListener('pointerenter', () => {
                movePpText.innerText = `${move.pp}/${move.maxPP}`;
                moveTypeText.innerText = move.type.toUpperCase();
            });

            btn.addEventListener('click', () => {
                hideMovesMenu();
                game.playerAction('move', index);
            });

            movesGrid.appendChild(btn);
        });

        if (game.player.moves.length > 0) {
            movePpText.innerText = `${game.player.moves[0].pp}/${game.player.moves[0].maxPP}`;
            moveTypeText.innerText = game.player.moves[0].type.toUpperCase();
        }
    };

    const hideMovesMenu = () => {
        movesContainer.style.display = 'none';
        logContainer.style.display = 'flex';
        controlsContainer.style.display = 'grid';
    };

    const bagContainer = document.getElementById('bag-container');

    const bagGrid = document.getElementById('bag-grid');
    const itemCountText = document.getElementById('item-count-text');
    const btnCancelBag = document.getElementById('btn-cancel-bag');

    const showBagMenu = () => {
        if (game.turn !== 'player') return;
        logContainer.style.display = 'none';
        controlsContainer.style.display = 'none';
        bagContainer.style.display = 'flex';

        bagGrid.innerHTML = '';
        game.inventory.forEach((item, index) => {
            const btn = document.createElement('button');
            btn.className = 'btn';
            btn.innerHTML = `<span>▶</span>${item.name.toUpperCase()}`;
            if (item.count <= 0) {
                btn.style.color = '#a0a0a0';
            }

            btn.addEventListener('pointerenter', () => {
                itemCountText.innerText = item.count;
            });

            btn.addEventListener('click', () => {
                hideBagMenu();
                game.playerAction('item', index);
            });

            bagGrid.appendChild(btn);
        });

        if (game.inventory.length > 0) {
            itemCountText.innerText = game.inventory[0].count;
        }
    };

    const hideBagMenu = () => {
        bagContainer.style.display = 'none';
        logContainer.style.display = 'flex';
        controlsContainer.style.display = 'grid';
    };

    const partyScreen = document.getElementById('party-screen');

    const btnCancelParty = document.getElementById('btn-cancel-party');

    const showPartyMenu = () => {
        if (game.turn !== 'player') return;

        document.getElementById('party-poke-name').innerText = game.player.name.toUpperCase();
        document.getElementById('party-hp-current').innerText = game.player.health;
        document.getElementById('party-hp-max').innerText = game.player.maxHealth;
        document.getElementById('party-hp-bar').style.width = `${(game.player.health / game.player.maxHealth) * 100}%`;

        const spriteIcon = document.getElementById('party-poke-icon');
        const shinyDir = game.player.isShiny ? 'ani-shiny' : 'ani';
        spriteIcon.src = `https://play.pokemonshowdown.com/sprites/${shinyDir}/${game.player.name.toLowerCase()}.gif`;

        partyScreen.style.display = 'flex';
    };

    const hidePartyMenu = () => {
        partyScreen.style.display = 'none';
    };

    const statsScreen = document.getElementById('stats-screen');

    const btnCancelStats = document.getElementById('btn-close-stats');
    const btnPartySlot = document.getElementById('btn-party-slot');

    btnPartySlot.addEventListener('click', () => {
        partyScreen.style.display = 'none';

        document.getElementById('stats-poke-name').innerText = game.player.name.toUpperCase();
        document.getElementById('stats-poke-type').innerText = game.player.type.toUpperCase();
        document.getElementById('stats-poke-ability').innerText = game.player.ability.toUpperCase();
        document.getElementById('stats-poke-level').innerText = game.player.level;
        document.getElementById('stats-poke-nature').innerText = game.player.nature.name.toUpperCase();
        document.getElementById('stats-poke-shiny').innerText = game.player.isShiny ? 'VARIOPINTO ★' : 'ESTÁNDAR';
        document.getElementById('stats-poke-shiny').style.color = game.player.isShiny ? '#d0a000' : 'inherit';

        const statsSpriteIcon = document.getElementById('stats-poke-icon');
        const shinyDir = game.player.isShiny ? 'ani-shiny' : 'ani';
        statsSpriteIcon.src = `https://play.pokemonshowdown.com/sprites/${shinyDir}/${game.player.name.toLowerCase()}.gif`;
        const statsMovesList = document.getElementById('stats-moves-list');
        statsMovesList.innerHTML = '';
        game.player.moves.forEach((move) => {
            const moveHtml = `
            <div class="stat-move-slot">
                <span class="stat-move-name">${move.name}</span>
                <span class="stat-move-pp">PP ${move.pp}/${move.maxPP}</span>
            </div>
            `;
            statsMovesList.insertAdjacentHTML('beforeend', moveHtml);
        });

        statsScreen.style.display = 'flex';
    });

    btnCancelStats.addEventListener('click', () => {
        statsScreen.style.display = 'none';
        partyScreen.style.display = 'flex';
    });

});

attackBtn.addEventListener('click', showMovesMenu);
btnCancelMove.addEventListener('click', hideMovesMenu);

bagBtn.addEventListener('click', showBagMenu);
btnCancelBag.addEventListener('click', hideBagMenu);

abilityBtn.addEventListener('click', showPartyMenu);
btnCancelParty.addEventListener('click', hidePartyMenu);

runBtn.addEventListener('click', () => { game.playerAction('run'); });
