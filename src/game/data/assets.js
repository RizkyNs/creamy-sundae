/**
 * Central registry for runtime assets.
 *
 * `file` is relative to public/ and is consumed by Phaser's loader after
 * Preloader sets its base path to `assets`.
 */
export const GAME_ASSETS = {
    background: {
        key: 'background',
        file: 'bg.png',
        type: 'image',
        category: 'environment',
        status: 'approved',
        source: 'project-template',
        license: 'MIT/project template'
    },
    logo: {
        key: 'logo',
        file: 'logo.png',
        type: 'image',
        category: 'ui',
        status: 'approved',
        source: 'project-template',
        license: 'MIT/project template'
    },
    paperCup: {
        key: 'container-paper-cup',
        file: 'containers/container_paper_cup.png',
        type: 'image',
        category: 'containers',
        status: 'prototype-approved',
        source: 'original-project-artwork',
        license: 'Creamy Sundae project asset'
    },
    vanillaScoop: {
        key: 'ingredient-vanilla-scoop',
        file: 'ingredients/ingredient_vanilla_scoop.png',
        type: 'image',
        category: 'ingredients',
        status: 'prototype-approved',
        source: 'original-project-artwork',
        license: 'Creamy Sundae project asset'
    },
    chocolateScoop: {
        key: 'ingredient-chocolate-scoop',
        file: 'ingredients/ingredient_chocolate_scoop.png',
        type: 'image',
        category: 'ingredients',
        status: 'prototype-approved',
        source: 'original-project-artwork',
        license: 'Creamy Sundae project asset'
    },
    strawberryScoop: {
        key: 'ingredient-strawberry-scoop',
        file: 'ingredients/ingredient_strawberry_scoop.png',
        type: 'image',
        category: 'ingredients',
        status: 'prototype-approved',
        source: 'original-project-artwork',
        license: 'Creamy Sundae project asset'
    },
    waffleCone: {
        key: 'container-waffle-cone',
        file: 'containers/container_waffle_cone.png',
        type: 'image',
        category: 'containers',
        status: 'prototype-approved',
        source: 'original-project-artwork',
        license: 'Creamy Sundae project asset'
    },
    sprinkles: {
        key: 'topping-sprinkles',
        file: 'toppings/topping_sprinkles.png',
        type: 'image',
        category: 'toppings',
        status: 'prototype-approved',
        source: 'original-project-artwork',
        license: 'Creamy Sundae project asset'
    },
    cherry: {
        key: 'topping-cherry',
        file: 'toppings/topping_cherry.png',
        type: 'image',
        category: 'toppings',
        status: 'prototype-approved',
        source: 'original-project-artwork',
        license: 'Creamy Sundae project asset'
    },
    colaDrink: {
        key: 'drink-cola-cup',
        file: 'drinks/drink_cola_cup.png',
        type: 'image',
        category: 'drinks',
        status: 'prototype-approved',
        source: 'original-project-artwork',
        license: 'Creamy Sundae project asset'
    },
    lemonDrink: {
        key: 'drink-lemon-cup',
        file: 'drinks/drink_lemon_cup.png',
        type: 'image',
        category: 'drinks',
        status: 'prototype-approved',
        source: 'original-project-artwork',
        license: 'Creamy Sundae project asset'
    }
};
