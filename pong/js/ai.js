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
        // Super basic AI
        // when the ball is not in the middle waiting for the player to press space
        // the paddle will follow the ball once it's near the halfway point.
        // when the ball is in the middle and waiting (after a point gain) then move the paddle back to the middle of the y axis
        if (!ball.getData('inMiddle')) {
            if (ball.x > Phaser.Math.Between(screenWidth * 0.7, screenWidth * 0.9)) {
                if (ball.y > paddle.y) {
                    paddle.setVelocityY(screenHeight);
                } else if (ball.y < paddle.y) {
                    paddle.setVelocityY(-screenHeight);
                }
            }
        } else {
            if (paddle.y < screenHeight / 2) {
                paddle.setVelocityY(screenHeight);
            }else if (paddle.y > screenHeight / 2) {
                paddle.setVelocityY(-screenHeight);
            }
        }
    }
}