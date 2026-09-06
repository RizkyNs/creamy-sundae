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
        // GAME STATE
        // =========================================================

        this.money = 0;
        this.cupContents = [];
        this.cupScoopObjects = [];
        
        this.customerQueue = [
            { name: 'Customer 1', maxPatience: 25, order: { name: '1 × Vanilla Scoop', scoops: ['vanilla'] } },
            { name: 'Customer 2', maxPatience: 25, order: { name: '1 × Chocolate Scoop', scoops: ['chocolate'] } },
            { name: 'Customer 3', maxPatience: 25, order: { name: '1 × Strawberry Scoop', scoops: ['strawberry'] } },
            { name: 'Customer 4', maxPatience: 30, order: { name: '1 × Choco-Vanilla Duo', scoops: ['chocolate', 'vanilla'] } },
            { name: 'Customer 5', maxPatience: 35, order: { name: '1 × Neapolitan Trio', scoops: ['chocolate', 'vanilla', 'strawberry'] } }
        ];
        this.currentCustomerIndex = 0;
        this.currentOrder = null; // Will be set by showNextCustomer
        this.currentPatience = 0;
        this.maxPatience = 0;
        this.patienceActive = false;

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

        this.moneyText = this.add.text(width - 30, 40, '$0.00', {
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
        this.customerVisual = this.add.circle(120, 240, 45, 0xf1c27d);

        this.customerNameText = this.add.text(120, 305, 'Customer', {
            fontFamily: 'Arial',
            fontSize: 18,
            color: '#6b3e26'
        }).setOrigin(0.5);

        // Patience Meter (Bar)
        this.patienceBarBg = this.add.rectangle(120, 335, 100, 14, 0xdddddd).setOrigin(0.5);
        this.patienceBarFill = this.add.rectangle(70, 335, 100, 14, 0x4caf50).setOrigin(0, 0.5);
        this.patienceText = this.add.text(120, 355, '100%', {
            fontFamily: 'Arial',
            fontSize: 14,
            color: '#6b3e26'
        }).setOrigin(0.5);

        // =========================================================
        // ORDER TICKET
        // =========================================================

        this.orderTicketBg = this.add.rectangle(
            330,
            230,
            260,
            170,
            0xffffff
        );

        this.orderTitleText = this.add.text(330, 175, 'ORDER', {
            fontFamily: 'Arial Black',
            fontSize: 24,
            color: '#6b3e26'
        }).setOrigin(0.5);

        this.orderNameText = this.add.text(330, 235, '...', {
            fontFamily: 'Arial',
            fontSize: 22,
            color: '#6b3e26'
        }).setOrigin(0.5);

        this.orderDetailText = this.add.text(330, 280, '...', {
            fontFamily: 'Arial',
            fontSize: 20,
            color: '#9b6b43'
        }).setOrigin(0.5);

        this.orderToppingText = this.add.text(330, 325, 'No toppings', {
            fontFamily: 'Arial',
            fontSize: 18,
            color: '#9b6b43'
        }).setOrigin(0.5);

        // =========================================================
        // VALIDATION STATUS
        // =========================================================

        this.validationText = this.add.text(330, 400, 'KEEP BUILDING', {
            fontFamily: 'Arial Black',
            fontSize: 22,
            color: '#c28c65'
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

        // =========================================================
        // CUP
        // =========================================================

        this.cup = this.add.rectangle(
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
        // CUP STATUS
        // =========================================================

        this.cupStatusText = this.add.text(700, 610, '0 SCOOP', {
            fontFamily: 'Arial Black',
            fontSize: 20,
            color: '#6b3e26'
        }).setOrigin(0.5);

        // =========================================================
        // SERVE BUTTON
        // =========================================================

        const serveButton = this.add.rectangle(880, 550, 140, 60, 0x4caf50);
        const serveText = this.add.text(880, 550, 'SERVE', {
            fontFamily: 'Arial Black',
            fontSize: 22,
            color: '#ffffff'
        }).setOrigin(0.5);

        serveButton.setInteractive({ useHandCursor: true });

        serveButton.on('pointerover', () => {
            serveButton.setScale(1.05);
            serveText.setScale(1.05);
        });

        serveButton.on('pointerout', () => {
            serveButton.setScale(1);
            serveText.setScale(1);
        });

        serveButton.on('pointerdown', () => {
            if (this.validationText.text === 'ORDER READY') {
                this.serveOrder();
            } else {
                this.cameras.main.shake(100, 0.01);
            }
        });

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

        // Start first customer
        this.showNextCustomer();
    }

    // =============================================================
    // INGREDIENT BUTTON
    // =============================================================

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

        button.setInteractive({
            useHandCursor: true
        });

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
            const flavor = label.toLowerCase();
            this.createScoop(flavor);
        });
    }

    // =============================================================
    // CUSTOMER SYSTEM
    // =============================================================

    showNextCustomer ()
    {
        if (this.currentCustomerIndex < this.customerQueue.length)
        {
            const customer = this.customerQueue[this.currentCustomerIndex];
            
            // Set current order
            this.currentOrder = customer.order;
            
            // Setup Patience
            this.maxPatience = customer.maxPatience || 20;
            this.currentPatience = this.maxPatience;
            this.patienceActive = true;
            this.updatePatienceUI();

            // Update UI
            this.customerNameText.setText(customer.name);
            this.orderNameText.setText(customer.order.name);
            
            let detailText = customer.order.scoops.join(', ');
            this.orderDetailText.setText(detailText);

            // Make customer visible
            this.customerVisual.setVisible(true);
            this.customerNameText.setVisible(true);
            this.patienceBarBg.setVisible(true);
            this.patienceBarFill.setVisible(true);
            this.patienceText.setVisible(true);

            this.orderTicketBg.setVisible(true);
            this.orderTitleText.setVisible(true);
            this.orderNameText.setVisible(true);
            this.orderDetailText.setVisible(true);
            this.orderToppingText.setVisible(true);
        }
        else
        {
            // End of day or queue empty
            this.patienceActive = false;
            this.customerNameText.setText('No more customers');
            this.orderNameText.setText('-');
            this.orderDetailText.setText('-');
            this.orderToppingText.setText('-');
            this.customerVisual.setVisible(false);
            this.patienceBarBg.setVisible(false);
            this.patienceBarFill.setVisible(false);
            this.patienceText.setVisible(false);
            
            this.currentOrder = { scoops: [], toppings: [] };
        }

        // Validate any existing cup contents against the new order (should be empty, but just in case)
        this.validateRecipe();
    }

    updatePatienceUI ()
    {
        const ratio = Math.max(0, this.currentPatience / this.maxPatience);
        this.patienceBarFill.setSize(100 * ratio, 14);

        const percent = Math.ceil(ratio * 100);
        this.patienceText.setText(`${percent}%`);

        if (ratio > 0.5)
        {
            this.patienceBarFill.setFillStyle(0x4caf50); // Green
        }
        else if (ratio > 0.25)
        {
            this.patienceBarFill.setFillStyle(0xff9800); // Orange
        }
        else
        {
            this.patienceBarFill.setFillStyle(0xf44336); // Red
        }
    }

    customerLeavesAngrily ()
    {
        this.patienceActive = false;
        console.log('Customer ran out of patience and left!');

        // Flash red & shake camera
        this.cameras.main.shake(200, 0.015);
        this.customerVisual.setFillStyle(0xf44336);

        // Clear cup contents if player had prepared something
        this.cupContents = [];
        this.cupScoopObjects.forEach(scoop => scoop.destroy());
        this.cupScoopObjects = [];
        this.cupStatusText.setText('0 SCOOP');
        this.validationText.setText('CUSTOMER LEFT');
        this.validationText.setColor('#f44336');

        this.time.delayedCall(1000, () => {
            this.customerVisual.setFillStyle(0xf1c27d);
            this.currentCustomerIndex++;
            this.showNextCustomer();
        });
    }

    update (time, delta)
    {
        if (this.patienceActive && this.currentPatience > 0)
        {
            this.currentPatience -= (delta / 1000); // delta is in ms
            this.updatePatienceUI();

            if (this.currentPatience <= 0)
            {
                this.currentPatience = 0;
                this.customerLeavesAngrily();
            }
        }
    }

    // =============================================================
    // SERVE ORDER
    // =============================================================

    serveOrder ()
    {
        this.patienceActive = false;

        // Dynamic price per scoop (prototype value: $2.50 for 1 scoop, +$1.50 per additional scoop)
        const scoopCount = (this.currentOrder && this.currentOrder.scoops) ? this.currentOrder.scoops.length : 1;
        const basePrice = 2.50 + (scoopCount - 1) * 1.50;

        // Base reward + Tip based on patience ratio
        const patienceRatio = this.currentPatience / this.maxPatience;
        let tip = 0;
        if (patienceRatio > 0.7) {
            tip = 1.00; // fast service tip
        } else if (patienceRatio > 0.4) {
            tip = 0.50;
        }

        const totalEarned = basePrice + tip;
        this.money += totalEarned;
        this.moneyText.setText('$' + this.money.toFixed(2));

        // Clear data
        this.cupContents = [];
        
        // Clear visual objects
        this.cupScoopObjects.forEach(scoop => scoop.destroy());
        this.cupScoopObjects = [];

        // Reset UI
        this.cupStatusText.setText('0 SCOOP');
        this.validationText.setText(tip > 0 ? `SERVED! +$${totalEarned.toFixed(2)} (+$${tip.toFixed(2)} tip)` : `SERVED! +$${totalEarned.toFixed(2)}`);
        this.validationText.setColor('#4caf50');
        
        console.log(`Order served! Earned: $${totalEarned.toFixed(2)}. Total Money:`, this.money);

        // Next customer after brief delay
        this.time.delayedCall(600, () => {
            this.currentCustomerIndex++;
            this.showNextCustomer();
        });
    }

    // =============================================================
    // RECIPE VALIDATION
    // =============================================================

    validateRecipe ()
    {
        let status = 'ORDER READY';

        if (this.cupContents.length > this.currentOrder.scoops.length)
        {
            status = 'WRONG ORDER';
        }
        else
        {
            for (let i = 0; i < this.cupContents.length; i++)
            {
                if (this.cupContents[i] !== this.currentOrder.scoops[i])
                {
                    status = 'WRONG ORDER';
                    break;
                }
            }

            if (status !== 'WRONG ORDER' && this.cupContents.length < this.currentOrder.scoops.length)
            {
                status = 'KEEP BUILDING';
            }
        }

        this.validationText.setText(status);

        if (status === 'ORDER READY') {
            this.validationText.setColor('#4caf50');
        } else if (status === 'WRONG ORDER') {
            this.validationText.setColor('#f44336');
        } else {
            this.validationText.setColor('#c28c65');
        }

        console.log('Recipe Status:', status);
    }

    // =============================================================
    // CREATE SCOOP (ALL FLAVORS)
    // =============================================================

    createScoop (flavor)
    {
        const flavorConfigs = {
            vanilla: {
                color: 0xfff5d6,
                stroke: 0xd19a76
            },
            chocolate: {
                color: 0x8b5a3c,
                stroke: 0x5a3824
            },
            strawberry: {
                color: 0xffa6b6,
                stroke: 0xd9657b
            }
        };

        const config = flavorConfigs[flavor] || flavorConfigs.vanilla;

        const scoop = this.add.circle(
            700,
            470,
            35,
            config.color
        );

        scoop.setStrokeStyle(
            4,
            config.stroke
        );

        scoop.setInteractive();

        this.input.setDraggable(scoop);

        scoop.on('dragstart', () =>
        {
            scoop.setScale(1.15);
        });

        scoop.on('drag', (pointer, dragX, dragY) =>
        {
            scoop.x = dragX;
            scoop.y = dragY;
        });

        scoop.on('dragend', () =>
        {
            scoop.setScale(1);

            const cupX = 700;
            const cupY = 550;

            const distance = Math.hypot(
                scoop.x - cupX,
                scoop.y - cupY
            );

            if (distance < 90)
            {
                // Masukkan scoop ke cup
                scoop.x = cupX;
                scoop.y = 520 - (this.cupContents.length * 30); // Stack them slightly higher if multiple

                // Disable dragging once in cup
                this.input.setDraggable(scoop, false);

                // Simpan data scoop
                this.cupContents.push(flavor);
                this.cupScoopObjects.push(scoop);

                // Update status cup
                this.cupStatusText.setText(
                    `${this.cupContents.length} SCOOP`
                );

                console.log(
                    'Cup contents:',
                    this.cupContents
                );

                this.validateRecipe();
            }
            else
            {
                // Scoop dilepas di luar cup
                scoop.destroy();
            }
        });
    }
}
