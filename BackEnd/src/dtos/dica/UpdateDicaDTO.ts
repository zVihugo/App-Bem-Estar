import { Type } from '@prisma/client';

export interface UpdateDicaDTO {
  userId: string;
  title: string;
  imageUrl: string;
  type: Type;
}
