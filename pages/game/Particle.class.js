class Particle {
    constructor(obj) {
        this.x = obj.x + Math.random() * obj.width * 1 / 2;
        this.y = obj.y + obj.height;
        this.size = Math.random() * 3 + 3;
        this.frameTime = 0;
        this.fps = 60;
        this.frameInterval = 1000 / this.fps;
        this.markOfDeletion = false;
    }

    update(deltaTime) {
        if(this.frameTime > this.frameInterval) {
            this.size *= 0.95;

            this.x -= Math.random() * 8;
            this.y -= Math.random() * 3;
            if(this.size < 1) {
                this.markOfDeletion = true;
            } 
            this.frameTime = 0;
        }
        this.frameTime+=deltaTime;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }
}

export class Dust extends Particle {
    constructor(obj) {
        super(obj);
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = 0.2;
        super.draw(ctx);
        ctx.restore();
    }
}

export class Fire extends Particle {
    constructor(obj, imageData) {
        super(obj);
        this.x = obj.x + Math.random() * obj.width * 3 / 4;
        this.y = obj.y + obj.height / 2;
        this.image = imageData.image;
        this.size = Math.random() * 25 + 25;
        this.va = Math.random() * 0.2 - 0.1;
        this.angle = 0;
    }

    update(deltaTime) {
        super.update(deltaTime);
        this.angle += this.va;
        this.x += Math.sin(this.angle) * 2
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.drawImage(this.image, 0, 0, this.size, this.size);
        ctx.restore()
    }
}

export class Splash extends Particle {
    constructor(obj, imageData) {
        super(obj);
        this.x = obj.x +  obj.width * 0.5;
        this.y = obj.y + obj.height;
        this.image = imageData.image;
        this.size = Math.random() * 25 + 25;
        this.va = Math.random() * 0.2 - 0.1;
        this.angle = 0;
        this.speendX = Math.random() * 20 - 10;
        this.speedY = Math.random() + 0.5;;
    }

    update(deltaTime) {
        super.update(deltaTime);
        this.angle += this.va;
        this.x += this.speendX;
        this.y += this.speedY;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.drawImage(this.image, 0, 0, this.size, this.size);
        ctx.restore()
    }
}