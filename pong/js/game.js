import levelScene from "./levelScene.js";

export const screenWidth = 675;
export const screenHeight = 375;

const config = {
    type: Phaser.AUTO,
    parent: 'gameCanvas',
    width: screenWidth,
    height: screenHeight,
    transparent: true,
    resolution: 2,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { x: 0, y: 0 }
        }
    },
    scene: levelScene
};

const game = new Phaser.Game(config);