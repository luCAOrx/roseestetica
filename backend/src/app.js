const express = require('express');
//const cors = require('cors');
const routes = require('./routes');
const { errors } = require('celebrate');

// Iniciando o app
const app = express();

//app.use(cors);
app.use(express.json());
app.use(routes);
app.use(errors());

// not found
app.use((request, response, next) => {
  const erro = new Error('Página não encontrada');
  erro.status = 404;
  next(erro);
})

// catch all
app.use((erro, request, response, next) => {
  response.status(erro.status || 500)
  response.json({ erro: erro.message })
})

module.exports = app;