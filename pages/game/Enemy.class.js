class Enemy {
    constructor(imageData, game) {
        this.image = imageData.image;
        this.game = game;
        this.spriteWidth = 100.2;
        this.spriteHeight = 91.3;
        this.spriteFrames = 1;
        this.frameX = 0;
        this.frameY = 0;
        this.max_speed = 10;
        this.vx = 0;
        this.vy = 0;
        
        this.x = 0;
        this.y = 0;
        this.frameTime = 0;
        this.fps = 60;
        this.frameInterval = 1000 / this.fps;

        this.scale = 1;
        this.width = this.spriteWidth * this.scale;
        this.height = this.spriteHeight * this.scale;
        this.max_x = game.width + this.width;
        this.max_y = game.height - this.height - game.bottomMargin;
        this.markOfDeletion = false;

        this.spriteTime = 0;
        this.staggerFrame = 5
    }

    update(deltaTime) {
        if(this.x < -this.width) {
            this.markOfDeletion = true;
        }
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        if(this.game.debug) {
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
    }
}

export class Plant extends Enemy {
    constructor(imageData, game) {
        super(imageData, game);
        this.spriteWidth = 60;
        this.spriteHeight = 87;
        this.spriteFrames = 2;
        this.scale = 0.8;
        this.width = this.spriteWidth * this.scale;
        this.height = this.spriteHeight * this.scale;
        this.max_y = this.game.height - this.height - this.game.bottomMargin;
        this.x = this.game.width;
        this.y = this.max_y;
        this.vx = 0.2;
    }

    update(deltaTime) {
        super.update(deltaTime);
        if(this.frameTime > this.frameInterval) {
            this.frameX = Math.floor(this.spriteTime / this.staggerFrame) % this.spriteFrames;
            this.spriteTime++;
            this.x -= this.vx * this.game.max_speed;
            this.frameTime = 0;
        }
        this.frameTime += deltaTime;
    }
}

export class Fly extends Enemy {
    constructor(imageData, game) {
        super(imageData, game);
        this.spriteWidth = 60;
        this.spriteHeight = 44;
        this.spriteFrames = 6;
        this.scale = 1;
        this.width = this.spriteWidth * this.scale;
        this.height = this.spriteHeight * this.scale;
        this.max_y = this.game.height - this.height - this.game.bottomMargin;
        this.x = this.game.width;
        this.y = Math.random() * (this.max_y - 160);
        this.vx = Math.random()*0.2 + 0.3;;
        this.angle = 0;
    }

    update(deltaTime) {
        super.update(deltaTime);
        if(this.frameTime > this.frameInterval) {
            this.frameX = Math.floor(this.spriteTime / this.staggerFrame) % this.spriteFrames;
            this.spriteTime++;
            this.x -= this.vx * this.max_speed;
            this.y += Math.sin(this.angle) * 6;
            this.angle+=0.1;
            this.frameTime = 0;
        }
        this.frameTime += deltaTime;
    }
}

export class Spider extends Enemy {
    constructor(imageData, game) {
        super(imageData, game);
        this.spriteWidth = 120;
        this.spriteHeight = 144;
        this.spriteFrames = 6;
        this.scale = 0.6;
        this.width = this.spriteWidth * this.scale;
        this.height = this.spriteHeight * this.scale;
        this.max_y = this.game.height - this.height - this.game.bottomMargin;
        this.x = Math.random() * (this.game.width - this.width);
        this.y = -this.height;
        this.vy = Math.random() * 5 + 10;
        this.angle = 0;
    }

    update(deltaTime) {
        super.update(deltaTime);
        if(this.frameTime > this.frameInterval) {
            this.frameX = Math.floor(this.spriteTime / this.staggerFrame) % this.spriteFrames;
            this.spriteTime++;
            this.y += this.vy;
            this.vy -= 0.3;
            if(this.y < -this.height && this.vy < 0) {
                this.markOfDeletion = true;
            }
            this.frameTime = 0;
        }
        this.frameTime += deltaTime;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.x + this.width/2, 0);
        ctx.lineTo(this.x + this.width/2, this.y + this.height / 2);
        ctx.stroke();
        super.draw(ctx);
    }
}