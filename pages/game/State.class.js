import {Dust, Fire, Splash} from './Particle.class.js'

const STATES_MAP = {
    'standing' : {
        frameY: 0,
        spriteFrames: 7
    },
    'jumping_up' : {
        frameY: 1,
        spriteFrames: 7
    },
    'jumping_down' : {
        frameY: 2,
        spriteFrames: 7
    },
    'running' : {
        frameY: 3,
        spriteFrames: 9
    },
    'hitting' : {
        frameY: 4,
        spriteFrames: 11
    },
    'sitting' : {
        frameY: 5,
        spriteFrames: 5
    },
    'rolling' : {
        frameY: 6,
        spriteFrames: 7
    },
    'rolling_up' : {
        frameY: 6,
        spriteFrames: 7
    },
    'rolling_back' : {
        frameY: 6,
        spriteFrames: 7
    },
    'rolling_down' : {
        frameY: 6,
        spriteFrames: 7
    },
    'diving' : {
        frameY: 6,
        spriteFrames: 7
    },
    'sprinting' : {
        frameY: 7,
        spriteFrames: 7
    },
    'dying' : {
        frameY: 8,
        spriteFrames: 12
    },
    'getting_hit' : {
        frameY: 9,
        spriteFrames: 4
    }
}

class State{
    constructor(state) {
        this.state = state;
    }

    enter(game) {
        this.game = game;
        game.max_speed = 10;
        game.player.frameX = 0;
        game.player.frameY = STATES_MAP[this.state].frameY;
        game.player.spriteFrames = STATES_MAP[this.state].spriteFrames;
    }
}

export class Standing extends State {
    constructor(state) {
        super('standing');
    }

    enter(game) {
        super.enter(game);
        game.player.vx = -0.25 * game.max_speed;
    }

    inputHandler(commands) {
        if(commands.includes('ArrowDown')) {
            this.game.player.setCurrentState('sitting')
        }
        if(commands.includes('ArrowRight')) {
            this.game.player.setCurrentState('running')
        }
        if(commands.includes('ArrowLeft')) {
            this.game.player.setCurrentState('rolling_back')
        }
        if(commands.includes('ArrowUp')) {
            this.game.player.setCurrentState('jumping_up')
        }
        if(commands.includes('r')) {
            this.game.player.setCurrentState('rolling')
        }
    }
}

export class Sitting extends State {
    constructor(state) {
        super('sitting');
    }

    enter(game) {
        super.enter(game);
        game.max_speed = 0;
        game.player.vx = 0;
    }

    inputHandler(commands) {
        if(!commands.includes('ArrowDown')) {
            if(!commands.length) {
                this.game.player.setCurrentState('standing');
            }
            if(commands.includes('ArrowRight')) {
                this.game.player.setCurrentState('running')
            }
            if(commands.includes('ArrowUp')) {
                this.game.player.setCurrentState('jumping_up')
            }
        }
    }
}

export class Hitting extends State {
    constructor(state) {
        super('hitting');
    }

    enter(game) {
        super.enter(game);
        game.player.vx = 0 * game.max_speed;
    }

    inputHandler(commands) {
        if(this.game.player.frameX >=this.game.player.spriteFrames - 1) {
            if(!commands.length) {
                this.game.player.setCurrentState('standing');
            }
            if(commands.includes('ArrowDown')) {
                this.game.player.setCurrentState('sitting')
            }
            if(commands.includes('ArrowRight')) {
                this.game.player.setCurrentState('running')
            }
            if(commands.includes('ArrowLeft')) {
                this.game.player.setCurrentState('rolling_back')
            }
            if(commands.includes('ArrowUp')) {
                this.game.player.setCurrentState('jumping_up')
            }
            if(commands.includes('r')) {
                this.game.player.setCurrentState('rolling')
            }
        }
    }
}

export class Running extends State {
    constructor(state) {
        super('running');
    }

    enter(game) {
        super.enter(game);
        game.max_speed = 10;
        game.player.vx = 0.25 * game.max_speed;
    }

    inputHandler(commands) {
        this.game.particles.push(new Dust(this.game.player));
        if(!commands.length) {
            this.game.player.setCurrentState('standing');
        }
        if(commands.includes('ArrowUp')) {
            this.game.player.setCurrentState('jumping_up')
        }
        if(commands.includes('r')) {
            this.game.player.setCurrentState('rolling')
        }
        if(commands.includes('ArrowLeft')) {
            this.game.player.setCurrentState('rolling_back')
        }
    }
}

export class Rolling extends State {
    constructor(state) {
        super('rolling');
    }

    enter(game) {
        super.enter(game);
        game.player.vx = 0.8 * game.max_speed;
    }

    inputHandler(commands) {
        this.game.particles.unshift(new Fire(this.game.player, this.game.assets.images['fire']));
        if(!commands.includes('r')) {
            if(!commands.length) {
                this.game.player.setCurrentState('standing');
            }
            if(commands.includes('ArrowRight')) {
                this.game.player.setCurrentState('running')
            }
            if(commands.includes('ArrowUp')) {
                this.game.player.setCurrentState('jumping_up')
            }
            if(commands.includes('ArrowLeft')) {
                this.game.player.setCurrentState('rolling_back')
            }
        }else {
            if(commands.includes('ArrowUp')) {
                this.game.player.setCurrentState('rolling_up')
            }
        }

    }
}

export class RollingBack extends State {
    constructor(state) {
        super('rolling_back');
    }

    enter(game) {
        super.enter(game);
        game.player.vx = -0.8 * 10;
    }

    inputHandler(commands) {
        if(!commands.includes('r')) {
            if(!commands.length) {
                this.game.player.setCurrentState('standing');
            }
            if(commands.includes('r')) {
                this.game.player.setCurrentState('rolling')
            }
            if(commands.includes('ArrowRight')) {
                this.game.player.setCurrentState('running')
            }
            if(commands.includes('ArrowUp')) {
                this.game.player.setCurrentState('jumping_up')
            }
        }else {
            if(commands.includes('ArrowUp')) {
                this.game.player.setCurrentState('rolling_up')
            }
        }

    }
}

export class RollingUp extends State {
    constructor(state) {
        super('rolling_up');
    }

    enter(game) {
        super.enter(game);
        game.player.vy = -20;
    }

    inputHandler(commands) {
        this.game.particles.unshift(new Fire(this.game.player, this.game.assets.images['fire']));
        if(this.game.player.vy > 0) {
            this.game.player.setCurrentState('rolling_down');
        }
        if(commands.includes('ArrowDown')) {
            this.game.player.setCurrentState('diving');
        }
    }
}

export class RollingDown extends State {
    constructor(state) {
        super('rolling_down');
    }

    enter(game) {
        super.enter(game);
    }

    inputHandler(commands) {
        this.game.particles.unshift(new Fire(this.game.player, this.game.assets.images['fire']));
        if(this.game.player.onGround()) {
            if(commands.includes('ArrowRight')) {
                this.game.player.setCurrentState('running');
            }else {
                this.game.player.setCurrentState('standing');
            }
        }else {
            if(commands.includes('ArrowDown')) {
                this.game.player.setCurrentState('diving');
            }
        }
    }
}

export class Diving extends State {
    constructor(state) {
        super('diving');
    }

    enter(game) {
        super.enter(game);
        game.player.vx = 0;
        game.player.vy = 20;
    }

    inputHandler(commands) {
        this.game.particles.unshift(new Fire(this.game.player, this.game.assets.images['fire']));
        if(this.game.player.onGround()) {
            for(let i = 0; i < 50; ++i) {
                this.game.particles.unshift(new Splash(this.game.player, this.game.assets.images['fire']));
            }
            if(commands.includes('ArrowRight')) {
                this.game.player.setCurrentState('running');
            }else {
                this.game.player.setCurrentState('standing');
            }
        }
    }
}

export class JumpingUp extends State {
    constructor(state) {
        super('jumping_up');
    }

    enter(game) {
        super.enter(game);
        game.player.vy = -20;
    }

    inputHandler(commands) {
        if(this.game.player.vy > 0) {
            this.game.player.setCurrentState('jumping_down');
        }
    }
}

export class JumpingDown extends State {
    constructor(state) {
        super('jumping_down');
    }

    enter(game) {
        super.enter(game);
    }

    inputHandler(commands) {
        if(this.game.player.onGround()) {
            if(commands.includes('ArrowRight')) {
                this.game.player.setCurrentState('running');
            }else {
                this.game.player.setCurrentState('standing');
            }
        }
    }
}