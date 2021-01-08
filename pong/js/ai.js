import { screenWidth, screenHeight } from './game.js';

export default class AI {
    constructor(scene, x, y) {
        this.scene = scene;

        // Add sprite
        this.paddle = scene.playerGroup.create(x, y, "paddle").setScale(screenHeight / 1000).setOrigin(0.5, 0.5).setImmovable();
        this.paddle.setCollideWorldBounds(true);
        this.paddle.type = 'Right';
    }


    update(ball) {
        const paddle = this.paddle;
        // simple AI
        // the paddle will follow the ball once it's near the halfway point, and try to return to middle after that
        if (!ball.getData('is_waiting')) {
            // chase the ball
            if (ball.x > Phaser.Math.Between(screenWidth * 0.7, screenWidth * 0.9)) {
                if (ball.y > paddle.y) {
                    paddle.setVelocityY(screenHeight);
                } else if (ball.y < paddle.y) {
                    paddle.setVelocityY(-screenHeight);
                }
            }
            // maintain in middle position
            else {
                if (paddle.y < screenHeight * 0.5) {
                    paddle.setVelocityY(screenHeight*0.5);
                }else if (paddle.y > screenHeight * 0.5) {
                    paddle.setVelocityY(-screenHeight*0.5);
                }
            }
        }else{
            paddle.y = screenHeight * 0.5;
        }
    }
}