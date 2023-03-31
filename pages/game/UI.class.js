class UI {
    constructor(game) {
        this.game = game;
        this.fontSize = 25;
    }

    draw(ctx) {
        ctx.font = this.fontSize + 'px serif';
        ctx.fillStyle = 'black';
        let text = "Score:" + this.game.score;
        ctx.fillText(text, 20, 50);
        ctx.fillStyle = 'white';
        ctx.fillText(text, 22, 52);
        let lives = this.game.player_lives;
        let livesImage = this.game.assets.images['lives'].image;
        for(let i = 0; i < lives; ++i) {
            ctx.drawImage(livesImage, i * 20 + 20, 70, 20, 20 )
        }

        if(this.game.player_lives == 0) {
            ctx.font = 'bold 50px serif';
            ctx.fillStyle = 'black';
            ctx.textAlign = 'center';
            ctx.fillText('Game Over', this.game.width / 2, (this.game.height - 50) / 2);
            ctx.fillStyle = 'white';
            ctx.fillText('Game Over', this.game.width / 2 + 2, (this.game.height - 50) / 2 + 2);
        }
    }
}

export default UI;