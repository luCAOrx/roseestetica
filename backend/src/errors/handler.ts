import { ErrorRequestHandler } from "express";

import fileSystem from 'fs';

import path from 'path';

import multer from "multer";

import { ValidationError } from "yup";

interface ValidationErrors {
  [key: string]: string[];
}

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
  if(error instanceof ValidationError) {
    let errors: ValidationErrors = {}

    error.inner.forEach(err => {
      errors[`${err.path}`] = err.errors;
    });

    const imagem = request.file?.filename;

    fileSystem.unlinkSync(path.resolve(
      __dirname, '..', '..', `uploads/${imagem}`
    ));

    console.log(errors);

    return response.status(400).json({ message: 'Validation fails', errors })
  }

  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      const message = error.message = 'O arquivo não pode ter mais que 2mb.'

      const imagem = request.file?.filename;

      fileSystem.unlinkSync(path.resolve(
        __dirname, '..', '..', `uploads/${imagem}`
      ));

      return response.status(400).json({ message: message });
    }
  }

  const imagem = request.file?.filename;

  fileSystem.unlinkSync(path.resolve(
    __dirname, '..', '..', `uploads/${imagem}`
  ));

  console.log(error);
  return response.status(500).json({ message: 'Internal server error' });
}

export default errorHandler;