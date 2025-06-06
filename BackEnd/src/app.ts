import cors from 'cors';
import express from 'express';
import { connectToDatabase } from './infrastructure/bancoContext/prisma';
import { requestError } from './middleware/requestError';
import { dicaRoutes } from './routes/dica/dicaRoutes';
import { relatorioRoutes } from './routes/relatorio/relatorioRoutes';
import { reviewRoutes } from './routes/review/reviewRoutes';
import { authRoutes } from './routes/user/authRoutes';
import { userRoutes } from './routes/user/userRoutes';

const app = express();

app.use(cors());
app.use(express.json());

connectToDatabase();

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/reviews', reviewRoutes);
app.use('/relatorio', relatorioRoutes);
app.use('/dicas', dicaRoutes);
app.use(requestError);

export { app };
