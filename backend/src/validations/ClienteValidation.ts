import { Request, Response, NextFunction } from 'express'
import * as yup from 'yup'

export default {
  async cadastrar(request: Request, response: Response, next: NextFunction) {
    const {
      nome,
      cpf,
      telefone,
      celular,
      sexo_id,
      cidade_id,
      bairro,
      logradouro,
      numero,
      complemento,
      cep,
      email,
      senha
    } = request.body

    const data = {
      nome,
      cpf,
      telefone,
      celular,
      sexo_id,
      cidade_id,
      bairro,
      logradouro,
      numero,
      complemento,
      cep,
      email,
      senha
    }

    const regexLetras = /^([a-zA-Zà-úÀ-Ú]|\s+)+$/

    const regexNumeros = /^([0-9]|\s+)+$/

    const schema = yup.object().shape({
      nome: yup.string()
        .matches(regexLetras, 'O campo nome completo não aceita números!')
        .min(5, 'No mínimo 5 caracteres!')
        .max(90, 'No máximo 90 caracteres!')
        .required('O campo nome é obrigatório!'),

      cpf: yup.string()
        .matches(regexNumeros, 'O campo cpf não aceita letras!')
        .min(11, 'No mínimo 11 caracteres!')
        .max(11, 'No máximo 11 caracteres!')
        .required('O campo CPF é obrigatório!'),

      telefone: yup.string()
        .matches(/.{10,}/, {
          excludeEmptyString: true,
          message: 'No mínimo 10 caracteres!'
        })
        .max(10, 'No máximo 10 caracteres!')
        .notRequired(),

      celular: yup.string()
        .matches(regexNumeros, 'O campo celular não aceita letras!')
        .min(11, 'No mínimo 11 caracteres!')
        .max(11, 'No máximo 11 caracteres!')
        .required('O campo número de celular é obrigatório!'),

      sexo_id: yup.number().required('O campo sexo_id é obrigatório!')
        .min(1, 'No minímo 1'),

      cidade_id: yup.number().required('O campo cidade_id é obrigatório!')
        .min(1, 'No minímo 1'),

      bairro: yup.string()
        .matches(regexLetras, 'O campo bairro só aceita letras!')
        .min(3, 'No mínimo 3 caracteres!')
        .max(90, 'No máximo 90 caracteres!')
        .required('O campo bairro é obrigatório!'),

      logradouro: yup.string()
        .matches(regexLetras, 'O campo logradouro só aceita letras!')
        .min(5, 'No mínimo 5 caracteres!')
        .max(90, 'No máximo 90 caracteres!')
        .required('O campo logradouro é obrigatório!'),

      numero: yup.string()
        .matches(regexNumeros, 'O campo numero não aceita letras!')
        .min(1, 'No mínimo 1 caractere!')
        .max(6, 'No máximo 6 caracteres!')
        .required('O campo número é obrigatório!'),

      complemento: yup.string().optional()
        .matches(/.{5,}/, {
          excludeEmptyString: true,
          message: 'No mínimo 5 caracteres!'
        })
        .max(90, 'No máximo 90 caracteres!'),

      cep: yup.string()
        .matches(regexNumeros, 'O campo cep não aceita letras!')
        .min(8, 'No mínimo 8 caracteres!')
        .max(8, 'No máximo 8 caracteres!')
        .required('O campo CEP é obrigatório!'),

      email: yup.string()
        .email('O campo e-mail precisa ser um e-mail válido!')
        .max(80, 'No máximo 80 caracteres!')
        .required('O campo email é obrigatório!'),

      senha: yup.string()
        .min(8, 'No mínimo 8 caracteres!')
        .max(50, 'No máximo 50 caracteres!')
        .required('O campo senha é obrigatório!')
    })

    await schema.validate(data, {
      abortEarly: false
    })

    next()
  },

  async atualizarDadosPessoais(request: Request, response: Response, next: NextFunction) {
    const {
      nome,
      telefone,
      celular
    } = request.body

    const data = {
      nome,
      telefone,
      celular
    }

    const regexLetras = /^([a-zA-Zà-úÀ-Ú]|\s+)+$/

    const regexNumeros = /^([0-9]|\s+)+$/

    const schema = yup.object().shape({
      nome: yup.string()
        .matches(regexLetras, 'O campo nome completo não aceita números!')
        .min(5, 'No mínimo 5 caracteres!')
        .max(90, 'No máximo 90 caracteres!')
        .required('O campo nome é obrigatório!'),

      telefone: yup.string()
        .matches(/.{10,}/, {
          excludeEmptyString: true,
          message: 'No mínimo 10 caracteres!'
        })
        .max(10, 'No máximo 10 caracteres!')
        .notRequired(),

      celular: yup.string()
        .matches(regexNumeros, 'O campo celular não aceita letras!')
        .min(11, 'No mínimo 11 caracteres!')
        .max(11, 'No máximo 11 caracteres!')
        .required('O campo número de celular é obrigatório!')
    })

    await schema.validate(data, {
      abortEarly: false
    })

    next()
  },

  async atualizarEndereço(request: Request, response: Response, next: NextFunction) {
    const {
      cidade_id,
      bairro,
      logradouro,
      numero,
      complemento,
      cep
    } = request.body

    const data = {
      cidade_id,
      bairro,
      logradouro,
      numero,
      complemento,
      cep
    }

    const regexLetras = /^([a-zA-Zà-úÀ-Ú]|\s+)+$/

    const regexNumeros = /^([0-9]|\s+)+$/

    const schema = yup.object().shape({
      cidade_id: yup.number().required('O campo cidade_id é obrigatório!')
        .min(1, 'No minímo 1'),

      bairro: yup.string()
        .matches(regexLetras, 'O campo bairro só aceita letras!')
        .min(3, 'No mínimo 3 caracteres!')
        .max(90, 'No máximo 90 caracteres!')
        .required('O campo bairro é obrigatório!'),

      logradouro: yup.string()
        .matches(regexLetras, 'O campo logradouro só aceita letras!')
        .min(5, 'No mínimo 5 caracteres!')
        .max(90, 'No máximo 90 caracteres!')
        .required('O campo logradouro é obrigatório!'),

      numero: yup.string()
        .matches(regexNumeros, 'O campo numero não aceita letras!')
        .min(1, 'No mínimo 1 caractere!')
        .max(6, 'No máximo 6 caracteres!')
        .required('O campo número é obrigatório!'),

      complemento: yup.string().optional()
        .matches(/.{5,}/, {
          excludeEmptyString: true,
          message: 'No mínimo 5 caracteres!'
        })
        .max(90, 'No máximo 90 caracteres!'),

      cep: yup.string()
        .matches(regexNumeros, 'O campo cep não aceita letras!')
        .min(8, 'No mínimo 8 caracteres!')
        .max(8, 'No máximo 8 caracteres!')
        .required('O campo CEP é obrigatório!')
    })

    await schema.validate(data, {
      abortEarly: false
    })

    next()
  },

  async atualizarLogin(request: Request, response: Response, next: NextFunction) {
    const { email } = request.body

    const data = { email }

    const schema = yup.object().shape({
      email: yup.string()
        .email('O campo e-mail precisa ser um e-mail válido!')
        .max(80, 'No máximo 80 caracteres!')
        .required('O campo email é obrigatório!')
    })

    await schema.validate(data, {
      abortEarly: false
    })

    next()
  },

  async esqueciMinhaSenha(request: Request, response: Response, next: NextFunction) {
    const { email } = request.body

    const data = { email }

    const schema = yup.object().shape({
      email: yup.string()
        .email('O campo e-mail precisa ser um e-mail válido!')
        .max(80, 'No máximo 80 caracteres!')
        .required('O campo email é obrigatório!')
    })

    await schema.validate(data, {
      abortEarly: false
    })

    next()
  },

  async atualizarSenha(request: Request, response: Response, next: NextFunction) {
    const { email, senha, token } = request.body

    const data = { email, senha, token }

    const schema = yup.object().shape({
      email: yup.string()
        .email('O campo e-mail precisa ser um e-mail válido!')
        .max(80, 'No máximo 80 caracteres!')
        .required('O campo email é obrigatório!'),

      senha: yup.string()
        .min(8, 'No mínimo 8 caracteres!')
        .max(50, 'No máximo 50 caracteres!')
        .required('O campo senha é obrigatório!'),

      token: yup.string()
        .required('O campo token é obrigatório!')
    })

    await schema.validate(data, {
      abortEarly: false
    })

    next()
  }
}
