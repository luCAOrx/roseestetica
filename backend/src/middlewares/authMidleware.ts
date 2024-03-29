import aws from 'aws-sdk'
import { NextFunction, Request, Response } from 'express'
import fileSystem from 'fs'
import jwt from 'jsonwebtoken'
import path from 'path'
import { promisify } from 'util'

import authConfig from '../config/auth'

const s3 = new aws.S3()

export default function authentication(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
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

    return response.status(401).send({ erro: 'Nenhum token fornecido!' })
  }

  const parts = authHeader.split(' ')

  if (Number(parts.length === 0) === 2) {
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

    return response.status(401).send({ erro: 'Erro de token!' })
  }

  const [scheme, token] = parts

  if (!/^Bearer$/i.test(scheme)) {
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

    return response.status(401).send({ erro: 'Token mal formatado!' })
  }

  jwt.verify(token, String(authConfig.secret), async (err, decoded: any) => {
    if (err != null) {
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

      return response.status(401).send({ erro: 'Token inválido!' })
    }

    request.clientId = decoded.id

    return next()
  })
}
