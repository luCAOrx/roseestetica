"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
async function seed(knex) {
    await knex('cidades').insert([
        { cidade: 'Natal' },
        { cidade: 'Alto do Rodrigues' },
        { cidade: 'Pendências' },
        { cidade: 'Assu' },
        { cidade: 'Angicos' }
    ]);
}
exports.seed = seed;
