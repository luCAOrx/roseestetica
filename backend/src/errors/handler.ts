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

    const { filename: chave_da_imagem } = request.file;

    fileSystem.unlinkSync(path.resolve(
      __dirname, '..', '..', `uploads/${chave_da_imagem}`
    ));

    console.log(errors);

    return response.status(400).json({ message: 'Validation fails', errors })
  }

  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      const message = error.message = 'O arquivo não pode ter mais que 2mb.'
      return response.status(400).json({ message: message });
    }
  }

  console.log(error);
  return response.status(500).json({ message: 'Internal server error' });
}

export default errorHandler;