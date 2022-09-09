import aws from 'aws-sdk'
import { ErrorRequestHandler } from 'express'
import fileSystem from 'fs'
import multer from 'multer'
import path from 'path'
import { promisify } from 'util'
import { ValidationError } from 'yup'

interface ValidationErrors {
  [key: string]: string[]
}

const s3 = new aws.S3()

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
  if (error instanceof ValidationError) {
    const errors: ValidationErrors = {}

    error.inner.forEach(err => {
      errors[`${err.path}`] = err.errors
    })

    if (request.file) {
      const { key: imagem } = request.file as Express.MulterS3.File

      if (process.env.STORAGE_TYPE === 'local') {
        promisify(fileSystem.unlink)(path.resolve(
          __dirname, '..', '..', `uploads/${imagem}`
        ))
      } else {
        s3.deleteObject({
          Bucket: 'roseestetica-upload',
          Key: imagem
        }).promise()
      }
    }

    return response.status(400).json({ message: 'Validation fails', errors })
  }

  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      if (request.file) {
        const { key: imagem } = request.file as Express.MulterS3.File

        process.env.STORAGE_TYPE === 'local'

          ? promisify(fileSystem.unlink)(path.resolve(
            __dirname, '..', '..', `uploads/${imagem}`
          ))

          : s3.deleteObject({
            Bucket: 'roseestetica-upload',
            Key: imagem
          }).promise()
      }

      return response.status(400).json({
        erro: 'O arquivo não pode ter mais que 2mb.'
      })
    }
  }

  if (error.message === 'Tipo de arquivo inválido.') {
    if (request.file) {
      const { key: imagem } = request.file as Express.MulterS3.File

      if (process.env.STORAGE_TYPE === 'local') {
        promisify(fileSystem.unlink)(path.resolve(
          __dirname, '..', '..', `uploads/${imagem}`
        ))
      } else {
        s3.deleteObject({
          Bucket: 'roseestetica-upload',
          Key: imagem
        }).promise()
      }
    }

    return response.status(400).json({ erro: 'Tipo de arquivo inválido.' })
  }

  console.log(error)
  return response.status(500).json({ message: 'Internal server error' })
}

export default errorHandler
