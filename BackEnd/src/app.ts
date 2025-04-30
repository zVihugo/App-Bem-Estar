import cors from 'cors';
import express from 'express';
import { connectToDatabase } from './utils/prisma';

const app = express();

app.use(cors());

connectToDatabase();

export { app };
