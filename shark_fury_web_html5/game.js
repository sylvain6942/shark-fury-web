const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#006994',
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let requin;
let poissons;
let cursors;
let score = 0;
let scoreText;

const game = new Phaser.Game(config);

function preload() {
    this.load.image('requin', 'https://via.placeholder.com/50x30/3C5096/FFFFFF?text=R'); // Requin
    this.load.image('poisson', 'https://via.placeholder.com/20x20/00C800/FFFFFF?text=P'); // Poisson
}

function create() {
    requin = this.physics.add.sprite(50, 300, 'requin');
    poissons = this.physics.add.group();
    cursors = this.input.keyboard.createCursorKeys();

    scoreText = this.add.text(10, 10, 'Score: 0', {
        fontSize: '32px',
        fill: '#fff'
    });

    this.time.addEvent({
        delay: 500,
        callback: spawnPoisson,
        callbackScope: this,
        loop: true
    });

    this.physics.add.overlap(requin, poissons, mangerPoisson, null, this);
}

function update() {
    requin.setVelocity(0);

    if (cursors.left.isDown) {
        requin.setVelocityX(-200);
    } else if (cursors.right.isDown) {
        requin.setVelocityX(200);
    }

    if (cursors.up.isDown) {
        requin.setVelocityY(-200);
    } else if (cursors.down.isDown) {
        requin.setVelocityY(200);
    }

    poissons.children.iterate(poisson => {
        if (poisson) {
            poisson.x -= 3;
            if (poisson.x < -poisson.width) {
                poissons.remove(poisson, true, true);
            }
        }
    });
}

function spawnPoisson() {
    const y = Phaser.Math.Between(0, 580);
    const poisson = poissons.create(800, y, 'poisson');
    poisson.setCollideWorldBounds(false);
}

function mangerPoisson(requin, poisson) {
    poisson.destroy();
    score += 10;
    scoreText.setText('Score: ' + score);
}
