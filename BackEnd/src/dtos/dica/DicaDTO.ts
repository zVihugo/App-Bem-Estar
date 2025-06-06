import { Type } from '@prisma/client';

export interface DicaDTO {
  id: string;
  userId: string;
  title: string;
  imageUrl: string;
  type: Type;
}
