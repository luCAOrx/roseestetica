"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const configuration = require('../../knexfile');
const config = process.env.DATABASE_ENV === 'production' ? configuration.production : configuration.development;
const connection = (0, knex_1.default)(config);
exports.default = connection;
