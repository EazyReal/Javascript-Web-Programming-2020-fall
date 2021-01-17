import Player from "./player.js";
import AI from "./ai.js";
import { screenWidth, screenHeight } from './game.js';

export default class PongScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PongScene' });
    }

    preload() {
        this.load.image("ball", "assets/ball.png");
        this.load.image("paddle", "assets/paddle.png");
    }

    create() {
        // set world bounds
        this.physics.world.setBounds(0, 0, screenWidth, screenHeight, true, true, true, true);

        // set camera
        this.cam = this.cameras.main;
        this.cam.flash();

        // add the middle line
        let graphics = this.add.graphics({ lineStyle: {width: 2, color: 0xffffff} });
        let line = new Phaser.Geom.Line(screenWidth / 2, 0, screenWidth / 2, screenHeight);
        graphics.strokeLineShape(line);

        // create inputs
        this.cursors = this.input.keyboard.createCursorKeys();

        // create player group for player and ai
        this.playerGroup = this.physics.add.group();
        // add ball Group
        this.ballGroup = this.physics.add.group({
            bounceX: 1,
            bounceY: 1,
            collideWorldBounds: true,
        });

        // create player
        this.player = new Player(this, screenWidth * 0.05, screenHeight / 2);
        this.score1 = 0;
        document.querySelector('#scoreOne').innerHTML = this.score1;

        //create ai/player2
        this.ai = new AI(this, screenWidth * 0.95, screenHeight / 2);
        this.score2 = 0;
        document.querySelector('#scoreTwo').innerHTML = this.score2;

        //particles to follow the ball
        this.particles = this.add.particles('ball');
        this.emitter = this.particles.createEmitter({
            speed: 50,
            scale: { start: 0.1, end: 0 },
            lifespan: 1000,
            blendMode: 'SCREEN'
        });

        // create the ball and describe its physics
        this.ball = this.ballGroup.create(0, 0, "ball").setOrigin(0.5, 0.5);
        this.resetBall(); // without this the ball starts in 0,0 and cause player 2 wins instantly
        this.ball.setScale(0.5, 0.5);
        this.ball.setMaxVelocity(screenWidth);
        this.ball.setMass(1);
        this.ball.body.onWorldBounds = true;
        this.ball.type = 'ball';
        this.ball.setData('is_waiting', true); // status of the ball
        // particle emitter should follows ball
        this.emitter.startFollow(this.ball);

        // space key to start a round
        this.input.keyboard.on('keydown_SPACE', function(event) {
            if (this.ball.getData('is_waiting')) {

                this.ball.setActive(true);
                // decide to left/right first randomly
                if (Math.random() > 0.49) {
                    this.ball.setVelocity(-200, Phaser.Math.Between(-1, -4));
                } else {
                    this.ball.setVelocity(200, Phaser.Math.Between(1, 4));
                }
                this.ball.setData('is_waiting', false);
            }
        }, this);

        //decide collide behavior
        this.physics.add.collider(this.ball, this.playerGroup, this.hitPaddle, null, this);
    }

    update(time, delta) {
        this.player.update();
        this.ai.update(this.ball);

        // if ball goes out on left side (ai wins)
        if (this.ball.x < screenWidth * 0.01) {
            this.score2 += 1;
            console.log("player 2 wins")
            document.querySelector('#scoreTwo').innerHTML = this.score2;
            this.resetBall();
        }
        // ball goes out on right side (player wins)
        if (this.ball.x > screenWidth * 0.99) {
            this.score1 += 1;
            console.log("player 1 wins")
            document.querySelector('#scoreOne').innerHTML = this.score1;
            this.resetBall();
        }
    }

    hitPaddle(ball, paddle) {
        let diff = 0;
        // above
        if (ball.y <= paddle.y) {
            // ball is on the left-hand side of the paddle
            diff = ball.y - paddle.y;
            ball.setVelocityY(400 * diff / screenHeight);
        }
        // below
        else if (ball.y > paddle.y) {
            // ball is on the right-hand side of the paddle
            diff = paddle.y + ball.y;
            ball.setVelocityY(400 * diff / screenHeight);
        }
        // accelerate the ball every bounce
        ball.setVelocityX(ball.body.velocity.x * 1.1);
    }

    resetBall() {
        // shake the cam to make players aware that a round has ended
        this.cam.shake(100, 0.01);
        // set ball back to starting position
        this.ball.setActive(false);
        this.ball.setVelocity(0);
        this.ball.setPosition(screenWidth / 2, screenHeight / 2);
        this.ball.setData('is_waiting', true);
        this.player.paddle.y = screenHeight / 2;
    }
}