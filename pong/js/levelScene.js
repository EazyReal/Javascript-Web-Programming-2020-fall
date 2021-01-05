import Player from "./player.js";
import AI from "./ai.js";
import { screenWidth, screenHeight } from './game.js';

/**
 * level Scene
 */
export default class levelScene extends Phaser.Scene {
    constructor() {
        super({ key: 'levelScene' });
    }

    preload() {
        this.load.image("ball", "assets/ball.png");
        this.load.image("paddle", "assets/paddle.png");
    }

    create() {
        // set world bounds
        this.physics.world.setBounds(0, 0, screenWidth, screenHeight, true, true, true, true);

        // camera
        this.cam = this.cameras.main;
        this.cam.flash();

        // add line down the middle
        let graphics = this.add.graphics({ lineStyle: {width: 2, color: 0xffffff} });
        let line = new Phaser.Geom.Line(screenWidth / 2, 0, screenWidth / 2, screenHeight);
        graphics.strokeLineShape(line);

        // create inputs
        this.cursors = this.input.keyboard.createCursorKeys();

        // create player group for player and ai
        this.playerGroup = this.physics.add.group();
        // Add ball Group
        this.ballGroup = this.physics.add.group({
            bounceX: 1,
            bounceY: 1,
            collideWorldBounds: true,
        });

        // create player
        this.player = new Player(this, screenWidth * 0.05, screenHeight / 2);
        this.playerScore = 0;
        document.querySelector('#scoreOne').innerHTML = this.playerScore;

        //create ai/player2
        this.ai = new AI(this, screenWidth * 0.95, screenHeight / 2);
        this.aiScore = 0;
        document.querySelector('#scoreTwo').innerHTML = this.aiScore;

        //particles to follow the ball
        this.particles = this.add.particles('ball');

        this.emitter = this.particles.createEmitter({
            speed: 100,
            scale: { start: 0.1, end: 0 },
            lifespan: 500,
            blendMode: 'SCREEN'
        });

        // create the ball
        this.ball = this.ballGroup.create(0, 0, "ball").setOrigin(0.5, 0.5);
        this.ball.setScale(0.5, 0.5);
        this.ball.setMaxVelocity(screenWidth);
        this.ball.setMass(1);
        this.ball.body.onWorldBounds = true;
        this.ball.type = 'ball';
        this.ball.setData('inMiddle', true);
        // particle emitter follow ball
        this.emitter.startFollow(this.ball);

        // Space key to start the game and to continue when a player scores
        this.input.keyboard.on('keydown_SPACE', function(event) {
            if (this.ball.getData('inMiddle')) {

                this.ball.setActive(true);
                // 'randomly' choose which way the ball goes
                if (Math.random() > 0.49) {
                    this.ball.setVelocity(-200, Phaser.Math.Between(-1, -4));
                } else {
                    this.ball.setVelocity(200, Phaser.Math.Between(1, 4));
                }
                this.ball.setData('inMiddle', false);
            }
        }, this);

        this.physics.add.collider(this.ball, this.playerGroup, this.hitPaddle, null, this);
    }

    update(time, delta) {
        this.player.update();
        this.ai.update(this.ball);

        // if ball goes out on left side (player)
        if (this.ball.x < screenWidth * 0.01) {
            this.aiScore += 1;
            document.querySelector('#scoreTwo').innerHTML = this.aiScore;
            this.resetBall();
        }
        // ball goes out on right side (ai)
        if (this.ball.x > screenWidth * 0.99) {
            this.playerScore += 1;
            document.querySelector('#scoreOne').innerHTML = this.playerScore;
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
        this.cam.shake(100, 0.01);
        // set ball back to starting position
        this.ball.setActive(false);
        this.ball.setVelocity(0);
        this.ball.setPosition(screenWidth / 2, screenHeight / 2);
        this.ball.setData('inMiddle', true);
        this.player.paddle.y = screenHeight / 2;
    }
}