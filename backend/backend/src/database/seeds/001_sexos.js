
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('sexos').del()
    .then(function () {
      // Inserts seed entries
      return knex('sexos').insert([
        { sexo: 'Masculino' },
        { sexo: 'Feminino' },
      ]);
    });
};
