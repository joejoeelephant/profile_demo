class FloatMessage{
    constructor(x1, y1, x2, y2) {
        this.x = x1;
        this.y = y1;
        this.tx = x2;
        this.ty = y2;
        this.frameTime = 0;
        this.fps = 20;
        this.frameInterval = 1000 / this.fps;
        this.markOfDeletion = false;
    }

    update(deltaTime) {
        if(this.frameTime > this.frameInterval) {
            this.x -= (this.x - this.tx) * 0.05;
            this.y -= (this.y - this.ty) * 0.05;
            if(this.x - this.tx < 10) {
                this.markOfDeletion = true;
            }
        }else {
            this.frameTime += deltaTime;
        }
    }

    draw(ctx) {
        ctx.font = '5px';
        ctx.fillStyle = 'white';
        ctx.fillText('+1', this.x, this.y);
    }
}

export default FloatMessage;