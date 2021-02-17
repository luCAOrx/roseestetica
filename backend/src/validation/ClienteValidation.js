const Joi = require('@hapi/joi');

module.exports = {
  cadastrar(request, response, next) {
    const schema = {
      cadastro: Joi.object().keys({
        nome: Joi.string().min(8).max(90).trim().messages({
          "string.base": `O campo "Nome" não permite números.`,
          "string.trim": `O campo "Nome" não permite espaços no começo e no fim.`,
          "string.empty": `O campo "Nome" não pode ficar vazio.`,
          "string.min": `O campo "Nome" deve ter no mínimo {#limit} caracteres.`,
          "string.max": `O campo "Nome" deve ter no máximo {#limit} caracteres.`,
          "any.required": `O campo "Nome" é obrigatório.`
        }).required(),

        cpf: Joi.string().min(11).max(11).trim().messages({
          "string.base": `O campo "Cpf" não permite números.`,
          "string.trim": `O campo "Cpf" não permite espaços no começo e no fim.`,
          "string.empty": `O campo "Cpf" não pode ficar vazio.`,
          "string.min": `O campo "Cpf" deve ter no mínimo {#limit} caracteres.`,
          "string.max": `O campo "Cpf" deve ter no máximo {#limit} caracteres.`,
          "any.required": `O campo "Cpf" é obrigatório.`
        }).required(),

        sexo_id: Joi.number().messages({
          "number.base": `O campo "Sexo" não é permite letras.`,
          "number.empty": `O campo "Sexo" não pode ficar vazio.`,
          "any.required": `O campo "Sexo" é obrigatório.`
        }).required(),

        telefone: Joi.string().empty('').default('false').min(10).max(10).trim().messages({
          "string.base": `O campo "Telefone" não permite números.`,
          "string.trim": `O campo "Telefone" não permite espaços no começo e no fim.`,
          "string.min": `O campo "Telefone" deve ter no mínimo {#limit} caracteres.`,
          "string.max": `O campo "Telefone" deve ter no máximo {#limit} caracteres.`,
        }).trim(),
        
        celular: Joi.string().min(11).max(11).trim().messages({
          "string.base": `O campo "Celular" não permite números.`,
          "string.trim": `O campo "Celular" não permite espaços no começo e no fim.`,
          "string.empty": `O campo "Celular" não pode ficar vazio.`,
          "string.min": `O campo "Celular" deve ter no mínimo {#limit} caracteres.`,
          "string.max": `O campo "Celular" deve ter no máximo {#limit} caracteres.`,
          "any.required": `O campo "Celular" é obrigatório.`
        }).required(),

        cidade_id: Joi.number().messages({
          "number.base": `O campo "Cidade" não permite letras.`,
          "number.empty": `O campo "Cidade" não pode ficar vazio.`,
          "any.required": `O campo "Cidade" é obrigatório.`
        }).required(),

        bairro: Joi.string().min(5).max(50).trim().messages({
          "string.base": `O campo "Bairro" não permite números.`,
          "string.trim": `O campo "Bairro" não permite espaços no começo e no fim.`,
          "string.empty": `O campo "Bairro" não pode ficar vazio.`,
          "string.min": `O campo "Bairro" deve ter no mínimo {#limit} caracteres.`,
          "string.max": `O campo "Bairro" deve ter no máximo {#limit} caracteres.`,
          "any.required": `O campo "Bairro" é obrigatório.`
        }).required(),

        logradouro: Joi.string().min(5).max(50).trim().messages({
          "string.base": `O campo "Logradouro" não permite números.`,
          "string.trim": `O campo "Logradouro" não permite espaços no começo e no fim.`,
          "string.empty": `O campo "Logradouro" não pode ficar vazio.`,
          "string.min": `O campo "Logradouro" deve ter no mínimo {#limit} caracteres.`,
          "string.max": `O campo "Logradouro" deve ter no máximo {#limit} caracteres.`,
          "any.required": `O campo "Logradouro" é obrigatório.`
        }).required(),

        numero: Joi.string().trim().messages({
          "string.base": `O campo "Número" não permite números.`,
          "string.empty": `O campo "Número" não pode ficar vazio.`,
          "any.required": `O campo "Número" é obrigatório.`
        }).required(),

        complemento: Joi.string().empty('').default('false').min(3).max(60).trim().messages({
          "string.base": `O campo "Complemento" não permite números.`,
          "string.trim": `O campo "Complemento" não permite espaços no começo e no fim.`,
          "string.min": `O campo "Complemento" deve ter no mínimo {#limit} caracteres.`,
          "string.max": `O campo "Complemento" deve ter no máximo {#limit} caracteres.`,
        }).trim(),

        cep: Joi.string().min(8).max(8).trim().messages({
          "string.base": `O campo "Cep" não permite números.`,
          "string.trim": `O campo "Cep" não permite espaços no começo e no fim.`,
          "string.empty": `O campo "Cep" não pode ficar vazio.`,
          "string.min": `O campo "Cep" deve ter no mínimo {#limit} caracteres.`,
          "string.max": `O campo "Cep" deve ter no máximo {#limit} caracteres`,
          "any.required": `O campo "Cep" é obrigatório`
        }).required(),

        email: Joi.string().min(5).max(60).trim().messages({
          "string.base": `O campo "E-mail" não permite números`,
          "string.trim": `O campo "E-mail" não permite espaços no começo e no fim.`,
          "string.email": `O campo "E-mail" tem que se parecer um e-mail.`,
          "string.min": `O campo "E-mail" deve ter no mínimo {#limit} caracteres.`,
          "string.max": `O campo "E-mail" deve ter no máximo {#limit} caracteres.`,
          "string.empty": `O campo "E-mail" não pode ficar vazio.`,
          "any.required": `O campo "E-mail" é obrigatório.`
        }).email().required(),

        senha: Joi.string().min(5).max(30).trim().messages({
          "string.base": `O campo "Senha" não só permite números.`,
          "string.trim": `O campo "Senha" não permite espaços no começo e no fim.`,
          "string.empty": `O cmpo "Senha" não pode ficar vazio.`,
          "string.min": `O campo "Senha" deve ter no mínimo {#limit} caracteres.`,
          "string.max": `O campo "Senha" deve ter no máximo {#limit} caracteres.`,
          "any.required": `O campo "Senha" é obrigatório.`
        }).required()
      })
    }
    const value = schema.cadastro.validate(request.body);
    if (value.error) {
      response.status(400).send({
        status: 400,
        erro: value.error.details[0].message
      })
    } else {
      next();
    }
  },

  atualizarDadosPessoais(request, response, next) {
    const schema = {
      atualizarDadosPessoais: Joi.object().keys({
        nome: Joi.string().min(8).max(90).trim().messages({
          "string.base": `O campo "Nome" não permite números.`,
          "string.trim": `O campo "Nome" não permite espaços no começo e no fim.`,
          "string.empty": `O campo "Nome" não pode ficar vazio.`,
          "string.min": `O campo "Nome" deve ter no mínimo {#limit} caracteres.`,
          "string.max": `O campo "Nome" deve ter no máximo {#limit} caracteres.`,
          "any.required": `O campo "Nome" é obrigatório.`
        }).required(),

        telefone: Joi.string().empty('').default('false').min(10).max(10).trim().messages({
          "string.base": `O campo "Telefone" não permite números.`,
          "string.trim": `O campo "Telefone" não permite espaços no começo e no fim.`,
          "string.min": `O campo "Telefone" deve ter no mínimo {#limit} caracteres.`,
          "string.max": `O campo "Telefone" deve ter no máximo {#limit} caracteres.`,
        }).trim(),
        
        celular: Joi.string().min(11).max(11).trim().messages({
          "string.base": `O campo "Celular" não permite números.`,
          "string.trim": `O campo "Celular" não permite espaços no começo e no fim.`,
          "string.empty": `O campo "Celular" não pode ficar vazio.`,
          "string.min": `O campo "Celular" deve ter no mínimo {#limit} caracteres.`,
          "string.max": `O campo "Celular" deve ter no máximo {#limit} caracteres.`,
          "any.required": `O campo "Celular" é obrigatório.`
        }).required(),

        cidade_id: Joi.number().messages({
          "number.base": `O campo "Cidade" não permite letras.`,
          "number.empty": `O campo "Cidade" não pode ficar vazio.`,
          "any.required": `O campo "Cidade" é obrigatório.`
        }).required(),

        bairro: Joi.string().min(5).max(50).trim().messages({
          "string.base": `O campo "Bairro" não permite números.`,
          "string.trim": `O campo "Bairro" não permite espaços no começo e no fim.`,
          "string.empty": `O campo "Bairro" não pode ficar vazio.`,
          "string.min": `O campo "Bairro" deve ter no mínimo {#limit} caracteres.`,
          "string.max": `O campo "Bairro" deve ter no máximo {#limit} caracteres.`,
          "any.required": `O campo "Bairro" é obrigatório.`
        }).required(),

        logradouro: Joi.string().min(5).max(50).trim().messages({
          "string.base": `O campo "Logradouro" não permite números.`,
          "string.trim": `O campo "Logradouro" não permite espaços no começo e no fim.`,
          "string.empty": `O campo "Logradouro" não pode ficar vazio.`,
          "string.min": `O campo "Logradouro" deve ter no mínimo {#limit} caracteres.`,
          "string.max": `O campo "Logradouro" deve ter no máximo {#limit} caracteres.`,
          "any.required": `O campo "Logradouro" é obrigatório.`
        }).required(),

        numero: Joi.string().trim().messages({
          "string.base": `O campo "Número" não permite números.`,
          "string.empty": `O campo "Número" não pode ficar vazio.`,
          "any.required": `O campo "Número" é obrigatório.`
        }).required(),

        complemento: Joi.string().empty('').default('false').min(3).max(60).trim().messages({
          "string.base": `O campo "Complemento" não permite números.`,
          "string.trim": `O campo "Complemento" não permite espaços no começo e no fim.`,
          "string.min": `O campo "Complemento" deve ter no mínimo {#limit} caracteres.`,
          "string.max": `O campo "Complemento" deve ter no máximo {#limit} caracteres.`,
        }).trim(),

        cep: Joi.string().min(8).max(8).trim().messages({
          "string.base": `O campo "Cep" não permite números.`,
          "string.trim": `O campo "Cep" não permite espaços no começo e no fim.`,
          "string.empty": `O campo "Cep" não pode ficar vazio.`,
          "string.min": `O campo "Cep" deve ter no mínimo {#limit} caracteres.`,
          "string.max": `O campo "Cep" deve ter no máximo {#limit} caracteres`,
          "any.required": `O campo "Cep" é obrigatório`
        }).required()
      })
    }
    const value = schema.atualizarDadosPessoais.validate(request.body);
    if (value.error) {
      response.status(400).send({
        status: 400,
        erro: value.error.details[0].message
      })
    } else {
      next();
    }
  },

  atualizarDadosDeLogin(request, response, next) {
    const schema = {
      atualizarDadosDeLogin: Joi.object().keys({
        email: Joi.string().min(5).max(60).trim().messages({
          "string.base": `O campo "E-mail" não permite números`,
          "string.trim": `O campo "E-mail" não permite espaços no começo e no fim.`,
          "string.email": `O campo "E-mail" tem que se parecer um e-mail.`,
          "string.min": `O campo "E-mail" deve ter no mínimo {#limit} caracteres.`,
          "string.max": `O campo "E-mail" deve ter no máximo {#limit} caracteres.`,
          "string.empty": `O campo "E-mail" não pode ficar vazio.`,
          "any.required": `O campo "E-mail" é obrigatório.`
        }).email().required()
      })
    }

    const value = schema.atualizarDadosDeLogin.validate(request.body);

    if (value.error) {
      response.status(400).send({
        status: 400,
        erro: value.error.details[0].message
      })
    } else {
      next();
    }
  },

  esqueciMinhaSenha(request, response, next) {
    const bodySchema = {
      esqueciMinhaSenha: Joi.object().keys({
        email: Joi.string().min(5).max(60).trim().messages({
          "string.base": `O campo "E-mail" não permite números`,
          "string.trim": `O campo "E-mail" não permite espaços no começo e no fim.`,
          "string.email": `O campo "E-mail" tem que se parecer um e-mail.`,
          "string.min": `O campo "E-mail" deve ter no mínimo {#limit} caracteres.`,
          "string.max": `O campo "E-mail" deve ter no máximo {#limit} caracteres.`,
          "string.empty": `O campo "E-mail" não pode ficar vazio.`,
          "any.required": `O campo "E-mail" é obrigatório.`
        }).email().required()
      })
    }

    const valueBody = bodySchema.esqueciMinhaSenha.validate(request.body);

    if (valueBody.error) {
      response.status(400).send({
        status: 400,
        erro: valueBody.error.details[0].message
      })
    } else {
      next();
    }
  },

  atualizarSenha(request, response, next) {
    const bodySchema = {
      atualizarSenha: Joi.object().keys({
        email: Joi.string().min(5).max(60).trim().messages({
          "string.base": `O campo "E-mail" não permite números`,
          "string.trim": `O campo "E-mail" não permite espaços no começo e no fim.`,
          "string.email": `O campo "E-mail" tem que se parecer um e-mail.`,
          "string.min": `O campo "E-mail" deve ter no mínimo {#limit} caracteres.`,
          "string.max": `O campo "E-mail" deve ter no máximo {#limit} caracteres.`,
          "string.empty": `O campo "E-mail" não pode ficar vazio.`,
          "any.required": `O campo "E-mail" é obrigatório.`
        }).email().required(),

        senha: Joi.string().min(5).max(30).trim().messages({
          "string.base": `O campo "Senha" não só permite números.`,
          "string.trim": `O campo "Senha" não permite espaços no começo e no fim.`,
          "string.empty": `O cmpo "Senha" não pode ficar vazio.`,
          "string.min": `O campo "Senha" deve ter no mínimo {#limit} caracteres.`,
          "string.max": `O campo "Senha" deve ter no máximo {#limit} caracteres.`,
          "any.required": `O campo "Senha" é obrigatório.`
        }).required(),

        token: Joi.string().min(40).max(40).trim().messages({
          "string.base": `O campo "Token" não só permite números.`,
          "string.trim": `O campo "Token" não permite espaços no começo e no fim.`,
          "string.empty": `O cmpo "Token" não pode ficar vazio.`,
          "string.min": `O campo "Token" deve ter no mínimo {#limit} caracteres.`,
          "string.max": `O campo "Token" deve ter no máximo {#limit} caracteres.`,
          "any.required": `O campo "Token" é obrigatório.`
        }).required()
      })
    }

    const valueBody = bodySchema.atualizarSenha.validate(request.body);

    if (valueBody.error) {
      response.status(400).send({
        status: 400,
        erro: valueBody.error.details[0].message
      })
    } else {
      next();
    }
  }
}