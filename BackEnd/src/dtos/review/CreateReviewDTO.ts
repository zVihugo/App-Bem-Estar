import {
  DificuldadeParaDormir,
  AcordaDescansado,
  SofreComSonoDuranteODia,
  UsaTelaAntesDeDormir,
} from '@prisma/client';

export interface CreateReviewDTO {
  userId: string;
  date: Date;
  mediaSono: number;
  DificuldadeParaDormir: DificuldadeParaDormir;
  AcordaDescansado: AcordaDescansado;
  SofreComSonoDuranteODia: SofreComSonoDuranteODia;
  UsaTelaAntesDeDormir: UsaTelaAntesDeDormir;
  TemRotinaDeSono: boolean;
}
