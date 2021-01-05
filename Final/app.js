const cors_sol = "http://localhost:8000/final";

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('flag', './assets/black-flag.svg');
}

function create ()
{
    this.cameras.main.setBackgroundColor(0x123456)
    this.add.image(0, 0, 'sky').setOrigin(0, 0)
}

function update ()
{
}