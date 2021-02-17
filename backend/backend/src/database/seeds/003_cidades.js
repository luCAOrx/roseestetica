
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cidades').del()
    .then(function () {
      // Inserts seed entries
      return knex('cidades').insert([
        { cidade: 'Natal' },
        { cidade: 'Alto do Rodrigues' },
        { cidade: 'Pendências' },
        { cidade: 'Assu' },
        { cidade: 'Angicos' }
      ]);
    });
};
