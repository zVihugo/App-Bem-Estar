import { Tipo } from '@prisma/client';

export interface CreateDicaDTO {
  userId: string;
  titulo: string;
  thumbnailUrl: string;
  link: string;
  tipo: Tipo;
}
