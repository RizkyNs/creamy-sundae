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
        source: 'original-project-svg',
        license: 'Creamy Sundae project asset'
    },
    vanillaScoop: {
        key: 'ingredient-vanilla-scoop',
        file: 'ingredients/ingredient_vanilla_scoop.png',
        type: 'image',
        category: 'ingredients',
        status: 'prototype-approved',
        source: 'original-project-svg',
        license: 'Creamy Sundae project asset'
    }
};
