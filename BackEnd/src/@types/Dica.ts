import { Type } from '@prisma/client';

export type DicaProps = {
  id: string;
  userId: string;
  title: string;
  imageUrl: string;
  type: Type;
};
