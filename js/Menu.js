class Menu extends Phaser.Scene {
    constructor() {
        super("mainmenu");
    }


    preload() {
        this.load.image('background_main', 'assets/mainmenu.png');
        this.load.image('button', 'assets/button.png');
        this.load.audio('music', 'assets/Epic Orchestra with Choir.wav');
    }

    create() {
        // Adicione um fundo ou qualquer outro elemento visual de fundo
        this.add.image(400, 300, 'background_main'); // Exemplo de um fundo

        let buttonStyle = {
            fontFamily: 'Arial',
            fontSize: '36px',
            color: '#A03232',
            stroke: '#A03232',  // Cor do contorno
            strokeThickness: 2, // Espessura do contorno
            padding: {
                x: 20,
                y: 10
            },
            fontWeight: 'bold' 
        };
        

        // Botão "Start Game"
        let startButton = this.add.text(120, 530, 'Start Game', buttonStyle)
            .setOrigin(0.5)
            .setInteractive();

        startButton.on('pointerup', () => {
            // Ao clicar em "Start Game", inicie a cena do jogo principal
            this.scene.start('level1');
        });

        // Botão "Quit Game"
        let quitButton = this.add.text(380, 530, 'Quit Game', buttonStyle)
            .setOrigin(0.5)
            .setInteractive();

        quitButton.on('pointerup', () => {
            // Ao clicar em "Quit Game", saia do jogo
            this.game.destroy(true);
        });

        this.backgroundMusic = this.sound.add('music', { loop: true });
        this.backgroundMusic.play();
    }
}