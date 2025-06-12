import { PrismaClient } from '@prisma/client';
import { config } from '../src/config/config';
import { passwordHash } from '../src/helpers/passwordHash';
import { prisma } from '../src/infrastructure/bancoContext/prisma';

class Seed {
  constructor(private readonly prisma: PrismaClient) {}

  async run() {
    const senhaEncriptada = passwordHash(config.ADMIN_PASSWORD);

    const adminExists = await this.prisma.usuario.findFirst({
      where: { email: 'admin@admin.com' },
    });

    if (!adminExists) {
      await this.prisma.usuario.create({
        data: {
          name: 'Administrador',
          email: 'admin@admin.com',
          senha: senhaEncriptada,
          dataDeNascimento: '01/01/2025',
          faculdade: 'UTFPR',
          curso: 'ADMINSTRADOR',
          role: 'ADMIN',
        },
      });
      console.log('Admin criado com sucesso');
    } else {
      console.log('Admin já existe. Nenhuma ação necessária.');
    }
  }
}

const seed = new Seed(prisma);

seed
  .run()
  .catch((err) => {
    console.error('Erro ao rodar o seed:', err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
