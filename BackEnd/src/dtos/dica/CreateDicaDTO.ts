import { Type } from '@prisma/client';

export interface CreateDicaDTO {
  userId: string;
  title: string;
  imageUrl: string;
  type: Type;
}
