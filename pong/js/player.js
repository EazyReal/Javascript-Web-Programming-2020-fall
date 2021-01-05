import { screenWidth, screenHeight } from './game.js';

export default class Player {
    constructor(scene, x, y, side="Left") {
        this.scene = scene;

        // Add sprite
        this.paddle = scene.playerGroup.create(x, y, "paddle").setScale(screenHeight / 1000).setOrigin(0.5, 0.5).setImmovable();
        this.paddle.setCollideWorldBounds(true);
        this.paddle.type = side;
    }

    update() {
        const scene = this.scene;
        const paddle = this.paddle;

        // keyboard controls
        if (scene.cursors.up.isDown) {
            paddle.setVelocityY(-screenHeight);
        } else if (scene.cursors.down.isDown) {
            paddle.setVelocityY(screenHeight);
        } else {
            paddle.setVelocityY(0);
        }
    }
}