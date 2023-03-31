import {Standing, Running, JumpingUp, JumpingDown, Rolling, Sitting, RollingUp, RollingDown, RollingBack, Diving, Hitting} from './State.class.js';
import InputHandler from './InputHandler.class.js';
import Explosion from './Explosion.classs.js';
import FloatMessage from './FloatMessage.class.js';

class Player {
    constructor(imageData, game) {
        this.image = imageData.image;
        this.game = game;
        this.spriteWidth = 100.2;
        this.spriteHeight = 91.3;
        this.spriteFrames = 1;
        this.frameX = 0;
        this.frameY = 0;
        this.max_speed = game.max_speed;
        this.vx = 0;
        this.vy = 0;
        this.gravity = 1;
        this.width = this.spriteWidth * 0.8;
        this.height = this.spriteHeight * 0.8;
        this.max_x = game.width - this.width;
        this.max_y = game.height - this.height - game.bottomMargin;
        this.x = 0;
        this.y = this.max_y;
        this.frameTime = 0;
        this.fps = 60;
        this.frameInterval = 1000 / this.fps;
        this.particles = [];
        this.states = {
            standing: new Standing(),
            running: new Running(),
            jumping_up: new JumpingUp(),
            jumping_down: new JumpingDown(),
            rolling: new Rolling(),
            sitting: new Sitting(),
            rolling_up: new RollingUp(),
            rolling_down: new RollingDown(),
            rolling_back: new RollingBack(),
            diving: new Diving(),
            hitting: new Hitting()
        };
        this.inputHandler = new InputHandler();
        
    }

    setCurrentState(state) {
        this.curentState = this.states[state];
        this.curentState.enter(this.game)
    }

    update(deltaTime) {
        if(this.frameTime > this.frameInterval) {
            let commands = this.inputHandler.keys;
            this.curentState.inputHandler(commands);
            if(this.frameX >= this.spriteFrames - 1) {
                this.frameX = 0;
            }
            this.frameX++;

            this.x += this.vx;
            this.y += this.vy;
            if(!this.onGround()) {
                this.vy += this.gravity;
            }else {
                this.vy = 0;
            }
            if(this.y > this.max_y) {
                this.y= this.max_y;
            }
            if(this.x < 0) this.x = 0;
            if(this.x > this.max_x) this.x = this.max_x;

            this.checkEnemiesCollision();
            this.frameTime = 0;
        }
        this.frameTime+=deltaTime;
    }

    checkEnemiesCollision() {
        this.game.enemies.forEach(item => {
            checkRectCollision(item, this)
        });
        function checkRectCollision(rect1, rect2) {
            if(rect1.x < rect2.x - rect1.width || rect1.x > rect2.x + rect2.width || rect1.y < rect2.y - rect1.height || rect1.y > rect2.y + rect2.height) {
                //no collision
            }else {
                //collision
                rect2.game.explosions.push(new Explosion(rect2.game.assets.images['boom'], rect1));
                rect2.game.floatMessages.push(new FloatMessage(rect1.x, rect1.y, 60, 50));

                rect1.markOfDeletion = true;
                rect2.game.score++;
                if( rect2.curentState.state !== 'rolling' 
                    && rect2.curentState.state !== 'rolling_up'
                    && rect2.curentState.state !== 'rolling_down'
                    && rect2.curentState.state !== 'rolling_back'
                    && rect2.curentState.state !== 'diving') 
                {
                    rect2.game.player_lives--;
                    if(rect2.game.player_lives <= 0) {
                        rect2.game.gameOver = true;
                    }
                    rect2.setCurrentState('hitting')
                    rect2.curentState.enter(rect2.game);
                }
            }
        }
    }

    onGround() {
        return this.y >= this.max_y;
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        this.particles.forEach(item => item.draw(ctx));
        if(this.game.debug) {
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
    }
}

export default Player;