import { Request, Response, Router } from 'express';
import { UsuarioApplication } from '../../application/Usuario/UsuarioApplication';
import { UsuarioController } from '../../controllers/UsuarioController';
import { prisma } from '../../infrastructure/bancoContext/prisma';
import { AvaliacaoRepository } from '../../infrastructure/repositories/Avaliacao/AvaliacaoRepository';
import { DicaRepository } from '../../infrastructure/repositories/Dica/DicaRepository';
import { MetaRepository } from '../../infrastructure/repositories/Metas/MetasRepository';
import { RelatorioRepository } from '../../infrastructure/repositories/Relatorio/RelatorioRepository';
import { UsuarioRepository } from '../../infrastructure/repositories/Usuario/UsuarioRepository';
import { authenticateToken } from '../../middleware/authenticateToken';
import { validateRequest } from '../../middleware/validateRequest';
import {
  userFindSchema,
  userUpdatePasswordSchema,
  userUpdateProfileSchema,
} from '../../schemas/userSchemas';

const usuarioRoutes = Router();

const usuarioRepository = UsuarioRepository.build(prisma);
const avaliacaoRepository = AvaliacaoRepository.build(prisma);
const relatorioRepository = RelatorioRepository.build(prisma);
const dicaRepository = DicaRepository.build(prisma);
const metaRepository = MetaRepository.build(prisma);

const application = UsuarioApplication.build(
  usuarioRepository,
  avaliacaoRepository,
  relatorioRepository,
  dicaRepository,
  metaRepository
);

const controller = new UsuarioController(application);

usuarioRoutes.get(
  '/:id',
  authenticateToken,
  validateRequest(userFindSchema),
  (request: Request, response: Response) => {
    controller.find(request, response);
  }
);

usuarioRoutes.put(
  '/:id/senha',
  authenticateToken,
  validateRequest(userUpdatePasswordSchema),
  (request: Request, response: Response) => {
    controller.updatePassword(request, response);
  }
);

usuarioRoutes.put(
  '/:id/perfil',
  authenticateToken,
  validateRequest(userUpdateProfileSchema),
  (request: Request, response: Response) => {
    controller.updateProfile(request, response);
  }
);

usuarioRoutes.delete(
  '/:id',
  authenticateToken,
  validateRequest(userFindSchema),
  (request: Request, response: Response) => {
    controller.delete(request, response);
  }
);

export { usuarioRoutes };
