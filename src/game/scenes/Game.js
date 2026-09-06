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
        this.day = 1;
        this.cupContents = [];
        this.cupScoopObjects = [];
        this.drinkContent = null;
        
        // Day stats
        this.dayEarnings = 0;
        this.dayServedCount = 0;
        this.dayLostCount = 0;
        this.dayTips = 0;

        this.customerQueue = [];
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

        this.dayText = this.add.text(width - 120, 40, 'DAY 1', {
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
            240,
            270,
            190,
            0xffffff
        );

        this.orderTitleText = this.add.text(330, 165, 'ORDER', {
            fontFamily: 'Arial Black',
            fontSize: 24,
            color: '#6b3e26'
        }).setOrigin(0.5);

        this.orderNameText = this.add.text(330, 210, '...', {
            fontFamily: 'Arial',
            fontSize: 20,
            color: '#6b3e26'
        }).setOrigin(0.5);

        this.orderDetailText = this.add.text(330, 250, '...', {
            fontFamily: 'Arial',
            fontSize: 18,
            color: '#9b6b43'
        }).setOrigin(0.5);

        this.orderDrinkText = this.add.text(330, 290, 'Drink: None', {
            fontFamily: 'Arial',
            fontSize: 18,
            color: '#9b6b43'
        }).setOrigin(0.5);

        // =========================================================
        // VALIDATION STATUS
        // =========================================================

        this.validationText = this.add.text(330, 390, 'KEEP BUILDING', {
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
        // DRINK STATION
        // =========================================================

        this.add.text(460, 440, 'SODA DISPENSER', {
            fontFamily: 'Arial Black',
            fontSize: 14,
            color: '#6b3e26'
        }).setOrigin(0.5);

        // Cola Dispenser Button
        this.createDrinkButton(415, 475, 'COLA', 0x3d1d11);

        // Lemon Soda Dispenser Button
        this.createDrinkButton(505, 475, 'LEMON', 0xfbc02d, '#333333');

        // Drink Cup Slot
        this.drinkCupBg = this.add.rectangle(460, 560, 75, 80, 0xffffff);
        this.drinkCupBg.setStrokeStyle(3, 0x6b3e26);

        this.drinkCupFill = this.add.rectangle(460, 565, 65, 60, 0x3d1d11);
        this.drinkCupFill.setVisible(false);

        this.drinkStatusText = this.add.text(460, 560, 'NO DRINK', {
            fontFamily: 'Arial Black',
            fontSize: 13,
            color: '#8b6045',
            align: 'center'
        }).setOrigin(0.5);

        // Clear Drink Button
        const clearDrinkBtn = this.add.rectangle(518, 560, 24, 24, 0xef5350);
        const clearDrinkTxt = this.add.text(518, 560, '✕', {
            fontFamily: 'Arial Black',
            fontSize: 14,
            color: '#ffffff'
        }).setOrigin(0.5);
        clearDrinkBtn.setInteractive({ useHandCursor: true });
        clearDrinkBtn.on('pointerdown', () => this.clearDrink());

        // =========================================================
        // CUP
        // =========================================================

        this.cup = this.add.rectangle(
            690,
            550,
            140,
            110,
            0xffffff
        );

        this.add.text(690, 550, 'CUP', {
            fontFamily: 'Arial Black',
            fontSize: 26,
            color: '#d19a76'
        }).setOrigin(0.5);

        // =========================================================
        // CUP STATUS
        // =========================================================

        this.cupStatusText = this.add.text(690, 610, '0 SCOOP', {
            fontFamily: 'Arial Black',
            fontSize: 20,
            color: '#6b3e26'
        }).setOrigin(0.5);

        // =========================================================
        // SERVE BUTTON
        // =========================================================

        const serveButton = this.add.rectangle(870, 550, 130, 60, 0x4caf50);
        const serveText = this.add.text(870, 550, 'SERVE', {
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

        // Start first day
        this.startDay(1);
    }

    // =============================================================
    // DAY SYSTEM
    // =============================================================

    startDay (dayNumber)
    {
        this.day = dayNumber;
        this.dayText.setText(`DAY ${this.day}`);

        // Reset day stats
        this.dayEarnings = 0;
        this.dayServedCount = 0;
        this.dayLostCount = 0;
        this.dayTips = 0;

        // Generate day customer queue
        this.customerQueue = this.generateCustomerQueue(this.day);
        this.currentCustomerIndex = 0;

        // Hide day summary if open
        if (this.daySummaryContainer) {
            this.daySummaryContainer.destroy();
            this.daySummaryContainer = null;
        }

        console.log(`Starting Day ${this.day} with ${this.customerQueue.length} customers!`);
        this.showNextCustomer();
    }

    generateCustomerQueue (day)
    {
        const possibleOrders = [
            // Single scoops
            { name: '1 × Vanilla Scoop', scoops: ['vanilla'], drink: null },
            { name: '1 × Chocolate Scoop', scoops: ['chocolate'], drink: null },
            { name: '1 × Strawberry Scoop', scoops: ['strawberry'], drink: null },
            // Drinks only
            { name: '1 × Iced Cola Soda', scoops: [], drink: 'cola' },
            { name: '1 × Lemon Splash Soda', scoops: [], drink: 'lemon' },
            // Combos (Scoop + Drink)
            { name: '1 × Vanilla + Cola Combo', scoops: ['vanilla'], drink: 'cola' },
            { name: '1 × Strawberry + Lemon Combo', scoops: ['strawberry'], drink: 'lemon' },
            { name: '1 × Choco-Vanilla Duo', scoops: ['chocolate', 'vanilla'], drink: null },
            { name: '1 × Duo Sundae + Cola', scoops: ['chocolate', 'vanilla'], drink: 'cola' },
            { name: '1 × Neapolitan Trio', scoops: ['chocolate', 'vanilla', 'strawberry'], drink: null },
            { name: '1 × Deluxe Trio + Lemon', scoops: ['chocolate', 'vanilla', 'strawberry'], drink: 'lemon' }
        ];

        // Customer count increases slightly per day (prototype: 3 + day)
        const count = Math.min(8, 3 + day);
        const queue = [];

        for (let i = 1; i <= count; i++) {
            // Pick available order based on day difficulty
            let maxOrderIndex = Math.min(possibleOrders.length, 3 + (day * 2));
            const randomOrder = possibleOrders[Math.floor(Math.random() * maxOrderIndex)];
            
            // Patience: 20 - 35 seconds
            const patience = Math.max(15, 30 - (day * 2) + Math.floor(Math.random() * 6));

            queue.push({
                name: `Customer ${i}`,
                maxPatience: patience,
                order: { ...randomOrder, toppings: [] }
            });
        }

        return queue;
    }

    createDrinkButton (x, y, label, color, textColor = '#ffffff')
    {
        const button = this.add.rectangle(x, y, 80, 45, color);
        button.setStrokeStyle(2, 0x6b3e26);

        const text = this.add.text(x, y, label, {
            fontFamily: 'Arial Black',
            fontSize: 13,
            color: textColor,
            stroke: textColor === '#ffffff' ? '#000000' : '#ffffff',
            strokeThickness: 2
        }).setOrigin(0.5);

        button.setInteractive({ useHandCursor: true });

        button.on('pointerover', () => {
            button.setScale(1.05);
            text.setScale(1.05);
        });

        button.on('pointerout', () => {
            button.setScale(1);
            text.setScale(1);
        });

        button.on('pointerdown', () => {
            const flavor = label.toLowerCase();
            this.dispenseDrink(flavor);
        });
    }

    dispenseDrink (flavor)
    {
        this.drinkContent = flavor;
        this.drinkCupFill.setVisible(true);

        if (flavor === 'cola') {
            this.drinkCupFill.setFillStyle(0x3d1d11);
            this.drinkStatusText.setText('COLA');
            this.drinkStatusText.setColor('#ffffff');
        } else if (flavor === 'lemon') {
            this.drinkCupFill.setFillStyle(0xfbc02d);
            this.drinkStatusText.setText('LEMON');
            this.drinkStatusText.setColor('#333333');
        }

        console.log('Dispensed drink:', flavor);
        this.validateRecipe();
    }

    clearDrink ()
    {
        this.drinkContent = null;
        this.drinkCupFill.setVisible(false);
        this.drinkStatusText.setText('NO DRINK');
        this.drinkStatusText.setColor('#8b6045');
        console.log('Drink cleared');
        this.validateRecipe();
    }

    endDay ()
    {
        this.patienceActive = false;
        console.log(`Day ${this.day} ended! Stats:`, {
            earnings: this.dayEarnings,
            served: this.dayServedCount,
            lost: this.dayLostCount,
            tips: this.dayTips
        });

        // Hide work UI elements
        this.customerVisual.setVisible(false);
        this.customerNameText.setVisible(false);
        this.patienceBarBg.setVisible(false);
        this.patienceBarFill.setVisible(false);
        this.patienceText.setVisible(false);

        this.orderTicketBg.setVisible(false);
        this.orderTitleText.setVisible(false);
        this.orderNameText.setVisible(false);
        this.orderDetailText.setVisible(false);
        this.orderDrinkText.setVisible(false);

        this.validationText.setText('DAY COMPLETED!');
        this.validationText.setColor('#4caf50');

        // Clear any items in work area
        this.clearDrink();
        this.cupContents = [];
        this.cupScoopObjects.forEach(scoop => scoop.destroy());
        this.cupScoopObjects = [];
        this.cupStatusText.setText('0 SCOOP');

        // Create End of Day Summary Modal
        const { width, height } = this.scale;
        this.daySummaryContainer = this.add.container(width / 2, height / 2);

        // Modal backdrop overlay
        const overlay = this.add.rectangle(0, 0, width, height, 0x000000, 0.5);
        overlay.setInteractive(); // blocks clicks behind

        // Modal window
        const modalBox = this.add.rectangle(0, 0, 480, 420, 0xfff9ef);
        modalBox.setStrokeStyle(6, 0x6b3e26);

        // Header
        const headerText = this.add.text(0, -160, `DAY ${this.day} SUMMARY`, {
            fontFamily: 'Arial Black',
            fontSize: 28,
            color: '#6b3e26'
        }).setOrigin(0.5);

        // Stats Lines
        const statsContent = [
            `Customers Served:  ${this.dayServedCount}`,
            `Customers Lost:    ${this.dayLostCount}`,
            `Day Earnings:      $${this.dayEarnings.toFixed(2)}`,
            `Tips Received:     $${this.dayTips.toFixed(2)}`,
            `Total Savings:     $${this.money.toFixed(2)}`
        ];

        const statsText = this.add.text(0, -40, statsContent.join('\n\n'), {
            fontFamily: 'Arial',
            fontSize: 20,
            color: '#5c3a21',
            align: 'center'
        }).setOrigin(0.5);

        // Next Day Button
        const nextDayBtn = this.add.rectangle(0, 140, 220, 55, 0x4caf50);
        nextDayBtn.setInteractive({ useHandCursor: true });

        const btnText = this.add.text(0, 140, `START DAY ${this.day + 1}`, {
            fontFamily: 'Arial Black',
            fontSize: 20,
            color: '#ffffff'
        }).setOrigin(0.5);

        nextDayBtn.on('pointerover', () => {
            nextDayBtn.setScale(1.05);
            btnText.setScale(1.05);
        });

        nextDayBtn.on('pointerout', () => {
            nextDayBtn.setScale(1);
            btnText.setScale(1);
        });

        nextDayBtn.on('pointerdown', () => {
            this.startDay(this.day + 1);
        });

        this.daySummaryContainer.add([
            overlay,
            modalBox,
            headerText,
            statsText,
            nextDayBtn,
            btnText
        ]);
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
            
            let detailText = (customer.order.scoops && customer.order.scoops.length > 0)
                ? 'Scoops: ' + customer.order.scoops.join(', ')
                : 'No Ice Cream';
            this.orderDetailText.setText(detailText);

            let drinkText = customer.order.drink
                ? 'Drink: ' + customer.order.drink.toUpperCase()
                : 'Drink: None';
            this.orderDrinkText.setText(drinkText);

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
            this.orderDrinkText.setVisible(true);
        }
        else
        {
            // End of day
            this.endDay();
            return;
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

        // Stats tracking
        this.dayLostCount++;

        // Flash red & shake camera
        this.cameras.main.shake(200, 0.015);
        this.customerVisual.setFillStyle(0xf44336);

        // Clear cup contents & drink if player had prepared something
        this.clearDrink();
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

        // Dynamic price calculation
        // Scoops: $2.50 for 1st scoop, +$1.50 per additional scoop. $0 if no scoop.
        const scoopCount = (this.currentOrder && this.currentOrder.scoops) ? this.currentOrder.scoops.length : 0;
        let basePrice = 0;
        if (scoopCount > 0) {
            basePrice += 2.50 + (scoopCount - 1) * 1.50;
        }

        // Drink price: +$1.75
        if (this.currentOrder && this.currentOrder.drink) {
            basePrice += 1.75;
        }

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
        this.dayEarnings += totalEarned;
        this.dayTips += tip;
        this.dayServedCount++;

        this.moneyText.setText('$' + this.money.toFixed(2));

        // Clear data
        this.cupContents = [];
        this.clearDrink();
        
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
        if (!this.currentOrder) return;

        let status = 'ORDER READY';

        // 1. Validate Scoops
        const targetScoops = this.currentOrder.scoops || [];
        if (this.cupContents.length > targetScoops.length)
        {
            status = 'WRONG ORDER';
        }
        else
        {
            for (let i = 0; i < this.cupContents.length; i++)
            {
                if (this.cupContents[i] !== targetScoops[i])
                {
                    status = 'WRONG ORDER';
                    break;
                }
            }

            if (status !== 'WRONG ORDER' && this.cupContents.length < targetScoops.length)
            {
                status = 'KEEP BUILDING';
            }
        }

        // 2. Validate Drink
        if (status !== 'WRONG ORDER')
        {
            const targetDrink = this.currentOrder.drink || null;
            if (targetDrink)
            {
                if (!this.drinkContent)
                {
                    status = 'KEEP BUILDING';
                }
                else if (this.drinkContent !== targetDrink)
                {
                    status = 'WRONG ORDER';
                }
            }
            else
            {
                // Customer did NOT order a drink, but player served one
                if (this.drinkContent)
                {
                    status = 'WRONG ORDER';
                }
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
