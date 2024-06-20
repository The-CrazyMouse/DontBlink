// Phaser game configuration
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [Menu, Level1, Level2, Level3]
        
};

// Initialize Phaser game
var game = new Phaser.Game(config);