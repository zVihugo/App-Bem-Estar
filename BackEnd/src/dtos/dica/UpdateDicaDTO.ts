import { Tipo } from '@prisma/client';

export interface UpdateDicaDTO {
  userId: string;
  titulo: string;
  thumbnailUrl: string;
  link: string;
  tipo: Tipo;
}
