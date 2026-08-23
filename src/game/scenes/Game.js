import { Scene } from 'phaser';

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }

    create ()
    {
        const { width, height } = this.scale;

        // =========================================================
        // BACKGROUND
        // =========================================================

        this.cameras.main.setBackgroundColor(0xfff4df);

        // =========================================================
        // TOP BAR
        // =========================================================

        this.add.rectangle(
            width / 2,
            40,
            width,
            80,
            0xffd9b8
        );

        this.add.text(30, 40, 'CREAMY SUNDAE', {
            fontFamily: 'Arial Black',
            fontSize: 28,
            color: '#6b3e26'
        }).setOrigin(0, 0.5);

        this.add.text(width - 30, 40, '$0.00', {
            fontFamily: 'Arial Black',
            fontSize: 28,
            color: '#6b3e26'
        }).setOrigin(1, 0.5);

        this.add.text(width - 120, 40, 'DAY 1', {
            fontFamily: 'Arial',
            fontSize: 20,
            color: '#8b6045'
        }).setOrigin(1, 0.5);

        // =========================================================
        // CUSTOMER / ORDER AREA
        // =========================================================

        this.add.text(120, 155, 'CUSTOMER', {
            fontFamily: 'Arial Black',
            fontSize: 22,
            color: '#6b3e26'
        }).setOrigin(0.5);

        // Temporary customer placeholder
        this.add.circle(120, 240, 45, 0xf1c27d);

        this.add.text(120, 305, 'Customer', {
            fontFamily: 'Arial',
            fontSize: 18,
            color: '#6b3e26'
        }).setOrigin(0.5);

        // Order ticket
        this.add.rectangle(
            330,
            230,
            260,
            170,
            0xffffff
        );

        this.add.text(330, 175, 'ORDER', {
            fontFamily: 'Arial Black',
            fontSize: 24,
            color: '#6b3e26'
        }).setOrigin(0.5);

        this.add.text(330, 235, '1 × Vanilla Sundae', {
            fontFamily: 'Arial',
            fontSize: 22,
            color: '#6b3e26'
        }).setOrigin(0.5);

        this.add.text(330, 280, 'Vanilla', {
            fontFamily: 'Arial',
            fontSize: 20,
            color: '#9b6b43'
        }).setOrigin(0.5);

        this.add.text(330, 325, 'No toppings', {
            fontFamily: 'Arial',
            fontSize: 18,
            color: '#9b6b43'
        }).setOrigin(0.5);

        // =========================================================
        // WORK AREA
        // =========================================================

        this.add.rectangle(
            width / 2 + 120,
            500,
            650,
            250,
            0xe8c49d
        );

        this.add.text(
            width / 2 + 120,
            410,
            'WORK AREA',
            {
                fontFamily: 'Arial Black',
                fontSize: 24,
                color: '#6b3e26'
            }
        ).setOrigin(0.5);

        // Cup
        this.add.rectangle(
            700,
            550,
            150,
            110,
            0xffffff
        );

        this.add.text(700, 550, 'CUP', {
            fontFamily: 'Arial Black',
            fontSize: 26,
            color: '#d19a76'
        }).setOrigin(0.5);

        // =========================================================
        // INGREDIENT PANEL
        // =========================================================

        this.add.text(
            width / 2,
            height - 165,
            'INGREDIENTS',
            {
                fontFamily: 'Arial Black',
                fontSize: 24,
                color: '#6b3e26'
            }
        ).setOrigin(0.5);

        this.createIngredientButton(
            250,
            height - 85,
            'VANILLA',
            0xfff5d6
        );

        this.createIngredientButton(
            510,
            height - 85,
            'CHOCOLATE',
            0x8b5a3c
        );

        this.createIngredientButton(
            770,
            height - 85,
            'STRAWBERRY',
            0xffa6b6
        );
    }

    createIngredientButton (x, y, label, color)
    {
        const button = this.add.rectangle(
            x,
            y,
            210,
            80,
            color
        );

        const text = this.add.text(x, y, label, {
            fontFamily: 'Arial Black',
            fontSize: 20,
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);

        button.setInteractive({ useHandCursor: true });

        button.on('pointerover', () =>
        {
            button.setScale(1.05);
            text.setScale(1.05);
        });

        button.on('pointerout', () =>
        {
            button.setScale(1);
            text.setScale(1);
        });

        button.on('pointerdown', () =>
        {
            console.log(`Ingredient selected: ${label}`);
        });
    }
}
