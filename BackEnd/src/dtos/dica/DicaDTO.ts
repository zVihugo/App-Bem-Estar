import { Tipo } from '@prisma/client';

export interface DicaDTO {
  id: string;
  userId: string;
  titulo: string;
  thumbnailUrl: string;
  link: string;
  tipo: Tipo;
}
