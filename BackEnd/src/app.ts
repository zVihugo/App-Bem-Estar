import cors from 'cors';
import express from 'express';
import { connectToDatabase } from './infrastructure/bancoContext/prisma';
import { authRoutes } from './routes/user/authRoutes';
import { userRoutes } from './routes/user/userRoutes';

const app = express();

app.use(cors());
app.use(express.json());

connectToDatabase();

app.use('/auth', authRoutes);
app.use('/users', userRoutes);

export { app };
