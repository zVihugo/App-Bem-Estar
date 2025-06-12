import { Role } from '@prisma/client';

export type UsuarioProps = {
  id: string;
  name: string;
  email: string;
  senha: string;
  dataDeNascimento: string;
  faculdade: string;
  curso: string;
  role: Role;
};

export type JwtUsuarioPayload = {
  id: string;
  email: string;
  role: Role;
};
