import cors from 'cors';
import express from 'express';
import { connectToDatabase } from './infrastructure/bancoContext/prisma';
import { requestError } from './middleware/requestError';
import { avaliacaoRoutes } from './routes/avaliacao/avaliacaoRoutes';
import { dicaRoutes } from './routes/dica/dicaRoutes';
import { metaRoutes } from './routes/metas/metasRoutes';
import { relatorioRoutes } from './routes/relatorio/relatorioRoutes';
import { authRoutes } from './routes/usuario/authRoutes';
import { usuarioRoutes } from './routes/usuario/usuarioRoutes';

const app = express();

app.use(cors());
app.use(express.json());

connectToDatabase();

app.use('/auth', authRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/avaliacoes', avaliacaoRoutes);
app.use('/relatorio', relatorioRoutes);
app.use('/dicas', dicaRoutes);
app.use('/metas', metaRoutes);
app.use(requestError);

export { app };
