import { Scene } from 'phaser';

export class MainMenu extends Scene
{
    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        const { width, height } = this.scale;

        this.cameras.main.setBackgroundColor(0xfff3dc);

        this.add.text(width / 2, 220, 'CREAMY SUNDAE', {
            fontFamily: 'Arial Black',
            fontSize: 64,
            color: '#6b3e26',
            stroke: '#ffffff',
            strokeThickness: 8
        }).setOrigin(0.5);

        this.add.text(width / 2, 300, 'ICE CREAM SHOP', {
            fontFamily: 'Arial',
            fontSize: 28,
            color: '#9b6b43'
        }).setOrigin(0.5);

        const startButton = this.add.text(width / 2, 450, 'START DAY', {
            fontFamily: 'Arial Black',
            fontSize: 32,
            color: '#ffffff',
            backgroundColor: '#e88b9c',
            padding: {
                left: 30,
                right: 30,
                top: 18,
                bottom: 18
            }
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true });

        startButton.on('pointerover', () =>
        {
            startButton.setScale(1.05);
        });

        startButton.on('pointerout', () =>
        {
            startButton.setScale(1);
        });

        startButton.on('pointerdown', () =>
        {
            this.scene.start('Game');
        });
    }
}
