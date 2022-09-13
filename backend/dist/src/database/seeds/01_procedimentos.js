"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
async function seed(knex) {
    await knex('procedimentos').insert([
        { procedimento: 'Limpeza', preco: 'R$ 35,00' },
        { procedimento: 'Tratamento', preco: 'R$ 45,00' },
        { procedimento: 'Limpeza e Tratamento', preco: 'R$ 60,00' }
    ]);
}
exports.seed = seed;
