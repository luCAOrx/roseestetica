"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
async function seed(knex) {
    await knex('sexos').insert([
        { sexo: 'Masculino' },
        { sexo: 'Feminino' }
    ]);
}
exports.seed = seed;
