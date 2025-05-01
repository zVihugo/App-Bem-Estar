import cors from 'cors';
import express from 'express';
import { connectToDatabase } from './infrastructure/bancoContext/prisma';

const app = express();

app.use(cors());

connectToDatabase();

export { app };
