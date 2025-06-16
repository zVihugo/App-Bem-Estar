import { Role } from '@prisma/client';

export interface UsuarioDTO {
  id: string;
  name: string;
  email: string;
  dataDeNascimento: string;
  faculdade: string;
  curso: string;
  role: Role;
}
