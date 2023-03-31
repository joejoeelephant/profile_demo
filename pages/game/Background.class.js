class Background{
    constructor(imgData, vx = 0.1, game) {
        this.image = imgData.image;
        this.game = game;
        this.x = 0;
        this.y = 0;
        this.vx = vx;
        this.width = imgData.width;
        this.height = imgData.height;
        this.fps = 60;
        this.frameTime = 0;
        this.frameInterval = 1000 / this.fps;
    }

    update(deltaTIme) {
        if(this.frameTime > this.frameInterval) {
            if(this.x <= -this.width) {
                this.x = 0;
            }
            this.x += -this.vx * this.game.max_speed;
            this.frameTime = 0;
        }
        this.frameTime += deltaTIme;
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x + this.width, this.y);
        ctx.drawImage(this.image, this.x, this.y);
    }
}

export default Background;