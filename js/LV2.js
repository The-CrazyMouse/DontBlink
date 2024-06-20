class Level2 extends Phaser.Scene {
    constructor() {
        super("level2");

        // Instance variables
        this.background = null;
        this.door = null;
        this.player = null;
        this.angel1 = null;
        this.angel2 = null;
        this.cursors = null;
        this.playerSpeed = 200;
    }

    // Preload assets
    preload() {
        this.load.image('player', 'assets/player.png');
        this.load.image('door', 'assets/door.png');
        this.load.image('angel', 'assets/angel.png');
        this.load.image('background', 'assets/mapaLV2.png');
    }


    // Create game elements
    create() {
        // Create background
        this.background = this.add.image(400, 300, 'background').setScale(1.9);
        this.door = this.physics.add.image(750, 0, 'door').setScale(0.1);

        // Create player spaceship
        this.player = this.physics.add.sprite(400, 500, 'player').setScale(0.1);
        this.player.setCollideWorldBounds(true);

        // Create enemy angel
        this.angel1 = this.physics.add.sprite(700, 200, 'angel').setScale(0.1);
        this.angel1.setCollideWorldBounds(true);

        this.angel2 = this.physics.add.sprite(350, 100, 'angel').setScale(0.1);
        this.angel2.setCollideWorldBounds(true);
        // Set up keyboard input
        this.cursors = this.input.keyboard.createCursorKeys();

        // Colliders
        this.physics.add.overlap(this.player, this.angel1, this.onPlayerAngelCollision, null, this);
        this.physics.add.overlap(this.player, this.angel2, this.onPlayerAngelCollision, null, this);
        this.physics.add.overlap(this.player, this.door, this.onPlayerDoorCollision, null, this);
        this.playerSpeed = 200;

    }

    // Update game state
    update() {
        let moved = false;
        if (this.cursors.left.isDown) {
            this.player.body.velocity.x = -this.playerSpeed;
            this.player.body.velocity.y = 0;
            this.player.rotation = Phaser.Math.DegToRad(180); // Facing left
            this.player.flipY = true; // Invert sprite vertically
            moved = true;
        } else if (this.cursors.right.isDown) {
            this.player.body.velocity.x = this.playerSpeed;
            this.player.body.velocity.y = 0;
            this.player.rotation = Phaser.Math.DegToRad(0); // Facing right
            this.player.flipY = false; // Don't invert sprite
            moved = true;
        } else if (this.cursors.up.isDown) {
            this.player.body.velocity.x = 0;
            this.player.body.velocity.y = -this.playerSpeed;
            this.player.rotation = Phaser.Math.DegToRad(270); // Facing up
            this.player.flipY = false; // Don't invert sprite
            moved = true;
        } else if (this.cursors.down.isDown) {
            this.player.body.velocity.x = 0;
            this.player.body.velocity.y = this.playerSpeed;
            this.player.rotation = Phaser.Math.DegToRad(90); // Facing down
            this.player.flipY = false; // Don't invert sprite
            moved = true;
        }

        // Move diagonally
        if (this.cursors.left.isDown && this.cursors.up.isDown) {
            this.player.rotation = Phaser.Math.DegToRad(225); // Facing up-left
            this.player.flipY = true; // Invert sprite vertically
        } else if (this.cursors.left.isDown && this.cursors.down.isDown) {
            this.player.rotation = Phaser.Math.DegToRad(135); // Facing down-left
            this.player.flipY = true; // Invert sprite vertically
        } else if (this.cursors.right.isDown && this.cursors.up.isDown) {
            this.player.rotation = Phaser.Math.DegToRad(315); // Facing up-right
            this.player.flipY = false; // Don't invert sprite
        } else if (this.cursors.right.isDown && this.cursors.down.isDown) {
            this.player.rotation = Phaser.Math.DegToRad(45); // Facing down-right
            this.player.flipY = false; // Don't invert sprite
        }

        if (!moved) {
            this.player.body.velocity.set(0);
        }

        this.angelmove(this.angel1);
        this.angelmove(this.angel2);
 

    }

    // Helper function to check if player is looking at the enemy
    isPlayerLookingAtEnemy(player, enemy) {
        // Calculate the angle between the player and the enemy
        const angleToEnemy = Phaser.Math.Angle.Between(player.x, player.y, enemy.x, enemy.y);

        // Use the player's current rotation as the facing direction
        const playerRotation = player.rotation; // Assuming the player's rotation is in radians

        // Calculate the shortest angular difference between the player's facing direction and the angle to the enemy
        const angleDifference = Phaser.Math.Angle.ShortestBetween(playerRotation, angleToEnemy);

        // Define an acceptable field of view angle (example: 45 degrees)
        const visionAngle = Phaser.Math.DegToRad(45);

        // Check if the angular difference is within the allowed field of view
        return Math.abs(angleDifference) < visionAngle;
    }

    onPlayerAngelCollision(player, angel) {
        // Ensure there's a real overlap before proceeding
        // Game over
        console.log("Game Over");

        this.playerSpeed = 0;


        // Display "Game Over" text
        let gameOverText = this.add.text(400, 200, 'Game Over', {
            fontFamily: 'Arial',
            fontSize: '48px',
            color: '#ff0000',
            fontWeight: 'bold',
            align: 'center'
        }).setOrigin(0.5);

        // Button to restart the game
        let restartButton = this.add.text(400, 300, 'Restart', {
            fontFamily: 'Arial',
            fontSize: '36px',
            color: '#ffffff',
            backgroundColor: '#A03232',
            padding: {
                x: 20,
                y: 10
            },
            align: 'center'
        }).setOrigin(0.5).setInteractive();

        restartButton.on('pointerup', () => {
            // Restart the game
            this.scene.restart();
        });

// Button to main menu
let mmButton = this.add.text(400, 400, 'Main Menu', {
    fontFamily: 'Arial',
    fontSize: '36px',
    color: '#ffffff',
    backgroundColor: '#A03232',
    padding: {
        x: 20,
        y: 10
    },
    align: 'center'
}).setOrigin(0.5).setInteractive();

mmButton.on('pointerup', () => {
    // go to the main menu of the game
this.scene.start('mainmenu');
});
    }

    onPlayerDoorCollision(player, door) {
        // Win level
        console.log("Level Completed");

        this.playerSpeed = 0;
        this.angel1.setVelocity(0);
        this.angel2.setVelocity(0);

        // Display "Level Completed" text
        let winText = this.add.text(400, 200, 'Level Completed', {
            fontFamily: 'Arial',
            fontSize: '48px',
            color: '#00ff00',
            fontWeight: 'bold',
            align: 'center'
        }).setOrigin(0.5);

        // Button to go to the next level
        let nextButton = this.add.text(400, 300, 'Next Level', {
            fontFamily: 'Arial',
            fontSize: '36px',
            color: '#ffffff',
            backgroundColor: '#32A032',
            padding: {
                x: 20,
                y: 10
            },
            align: 'center'
        }).setOrigin(0.5).setInteractive();

        nextButton.on('pointerup', () => {
            // Go to the next level
            this.scene.start('level3');
        });

        // Button to main menu
        let mmButton = this.add.text(400, 400, 'Main Menu', {
            fontFamily: 'Arial',
            fontSize: '36px',
            color: '#ffffff',
            backgroundColor: '#A03232',
            padding: {
                x: 20,
                y: 10
            },
            align: 'center'
        }).setOrigin(0.5).setInteractive();

        mmButton.on('pointerup', () => {
            // go to the main menu of the game
        this.scene.start('mainmenu');
        });
    }
    angelmove(angel) {
        const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, angel.x, angel.y);

        // If player is within 200 units of angel and not looking at it, move angel towards player
        if (distance < 200 && !this.isPlayerLookingAtEnemy(this.player, angel)) {
            this.physics.moveToObject(angel, this.player, 100);  // Move towards player
        } else {
            angel.setVelocity(0);  // Stop angel if not actively chasing
        }
        if (this.physics.overlap(this.player, this.door)) {
            angel.setVelocity(0);  // Stop angel when player reaches the door
        }
    }
}