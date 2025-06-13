import { Tipo } from '@prisma/client';

export type DicaProps = {
  id: string;
  userId: string;
  titulo: string;
  thumbnailUrl: string;
  link: string;
  tipo: Tipo;
};
