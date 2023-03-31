class Explosion {
    constructor(imageData, enemy) {
        this.image = imageData.image;
        this.spriteWidth = 100;
        this.spriteHeight = 90;
        this.spriteFrames = 5;
        this.frameX = 0;
        this.frameY = 0;
        this.size = Math.max(enemy.width, enemy.height);
        this.width = this.size;
        this.height = this.size * 0.8;
        this.frameTime = 0;
        this.fps = 30;
        this.frameInterval = 1000 / this.fps;
        this.x = enemy.x;
        this.y = enemy.y;
        this.markOfDeletion = false;
    }

    update(deltaTime) {
        if(this.frameTime > this.frameInterval) {
            if(this.frameX >= this.spriteFrames - 1) {
                this.markOfDeletion = true;
                this.frameX = this.spriteFrames;
            }else {
                this.frameX++;
            }
            this.frameTime = 0;
        }else {
            this.frameTime += deltaTime;
        }
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }

}

export default Explosion;