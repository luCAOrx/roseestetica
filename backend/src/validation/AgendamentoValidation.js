const Joi = require('@hapi/joi');

module.exports = {
  agendar(request, response, next) {
    const bodySchema = {
      agendamento: Joi.object().keys({
        data: Joi.date().messages({
          "date.base": `O campo "Data" só permite números.`,
          "date.empty": `O campo "Data" não pode ficar vazio.`,
          "any.required": `O campo "Data" é obrigatório.`
        }).required(),

        procedimento_id: Joi.number().messages({
          "number.base": `O campo "Procedimento" só permite números.`,
          "number.empty": `O campo "Procedimento" não pode ficar vazio.`,
          "any.required": `O campo "Procedimento" é obrigatório.`
        }).required(),

        horario_id: Joi.number().messages({
          "number.base": `O campo "Horário" só permite números.`,
          "number.empty": `O campo "Horário" não pode ficar vazio.`,
          "any.required": `O campo "Horário" é obrigatório.`
        }).required()
      })
    }

    const valueBody = bodySchema.agendamento.validate(request.body);

    if (valueBody.error) {
      response.status(400).send({
        status: 400,
        erro: valueBody.error.details[0].message
      })
    } else {
      next();
    }
  },

  remarcar(request, response, next) {
    const bodySchema = {
      agendamento: Joi.object().keys({
        data: Joi.date().messages({
          "date.base": `O campo "Data" só permite números.`,
          "date.empty": `O campo "Data" não pode ficar vazio.`,
          "any.required": `O campo "Data" é obrigatório.`
        }).required(),

        horario_id: Joi.number().messages({
          "number.base": `O campo "Horário" só permite números.`,
          "number.empty": `O campo "Horário" não pode ficar vazio.`,
          "any.required": `O campo "Horário" é obrigatório.`
        }).required()
      })
    }

    const valueBody = bodySchema.agendamento.validate(request.body);

    if (valueBody.error) {
      response.status(400).send({
        status: 400,
        erro: valueBody.error.details[0].message
      })
    } else {
      next();
    }
  },

  alterarProcedimento(request, response, next) {
    const bodySchema = {
      agendamento: Joi.object().keys({
        procedimento_id: Joi.number().messages({
          "number.base": `O campo "Procedimento" só permite números.`,
          "number.empty": `O campo "Procedimento" não pode ficar vazio.`,
          "any.required": `O campo "Procedimento" é obrigatório.`
        }).required()
      })
    }

    const valueBody = bodySchema.agendamento.validate(request.body);

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