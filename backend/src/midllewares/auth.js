const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = (request, response, next) => {
  const authHeader = request.headers.authorization;

  if(!authHeader)
    return response.status(401).send({ erro: 'Nenhum token fornecido!' });

  const parts = authHeader.split(' ');

  if(!parts.length === 2)
    return response.status(401).send({ erro: 'Erro de token!' });

  const [ scheme, token ] = parts;

  if(!/^Bearer$/i.test(scheme))
    return response.status(401).send({ erro: 'Token malformatado!' });

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if(err) return response.status(401).send({ erro: 'Token inválido!' });

    request.clienteId = decoded.id
    
    return next();
  });
}