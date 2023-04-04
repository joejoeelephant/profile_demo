import {Plant, Fly,Spider} from './Enemy.class.js'
import Background from './Background.class.js';
import UI from './UI.class.js';
import Player from './Player.class.js';

class Game {
    constructor(canvas_width, cavas_height, assets) {
        this.assets = assets;
        this.width = canvas_width;
        this.height = cavas_height;
        this.bottomMargin = 81;
        this.max_speed = 10
        this.backgrounds = [
            new Background(this.assets.images['layer-1'],0.00, this),
            new Background(this.assets.images['layer-2'],0.02, this),
            new Background(this.assets.images['layer-3'],0.03, this),
            new Background(this.assets.images['layer-4'],0.06, this),
            new Background(this.assets.images['layer-5'],0.25, this)
        ];
        this.enemies = [];
        this.enemyInteval = 1000;
        this.enemyTime = 0;
        this.debug = false;
        this.player = new Player(this.assets.images['player'], this);
        this.score = 0;
        this.UI = new UI(this);
        this.player.curentState = this.player.states['standing'];
        this.player.curentState.enter(this);
        this.particles = [];
        this.explosions = [];
        this.floatMessages = [];
        this.gameOver = false;
        this.player_lives = 3
    }

    setPlayer(player) {
        this.player = player;
    }

    #addEnemy(enemy) {
        this.enemies.push(enemy);
    }

    update(deltaTime) {
        if(this.enemyTime > this.enemyInteval) {
            let random = Math.random();
            if(random > 0.66) {
                if(this.max_speed > 0) this.#addEnemy(new Plant(this.assets.images['enemy_plant'], this));
            }else if(random > 0.33) {
                this.#addEnemy(new Fly(this.assets.images['enemy_fly'], this));
            }else {
                this.#addEnemy(new Spider(this.assets.images['enemy_spider'], this));
            }
            this.enemyTime = 0;
        }
        this.enemyTime += deltaTime;

        this.player.update(deltaTime);
        this.backgrounds.forEach(item => {
            item.update(deltaTime);
        })

        this.enemies = this.enemies.filter(item => !item.markOfDeletion);
        this.explosions = this.explosions.filter(item => !item.markOfDeletion);
        this.particles = this.particles.filter(item => !item.markOfDeletion);
        this.floatMessages = this.floatMessages.filter(item => !item.markOfDeletion);

        this.enemies.forEach((item, index) => {
            item.update(deltaTime);
        })

        this.explosions.forEach((item, index) => {
            item.update(deltaTime);
        })
        this.particles.forEach((item, index) => {
            item.update(deltaTime);
        });
        this.floatMessages.forEach((item, index) => {
            item.update(deltaTime);
        });

        if(this.particles.length > 50) {
            this.particles.length = 50
        }
    }

    draw(ctx) {
        this.backgrounds.forEach(item => {
            item.draw(ctx);
        });
        this.enemies.forEach(item => {
            item.draw(ctx);
        })
        this.player.draw(ctx);
        this.UI.draw(ctx);
        this.particles.forEach((item, index) => {
            item.draw(ctx);
        });
        this.explosions.forEach((item, index) => {
            item.draw(ctx);
        });
        this.floatMessages.forEach((item, index) => {
            item.draw(ctx);
        });
    }
}

export default Game;