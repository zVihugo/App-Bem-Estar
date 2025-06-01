import {
  DificuldadeParaDormir,
  AcordaDescansado,
  SofreComSonoDuranteODia,
  UsaTelaAntesDeDormir,
} from '@prisma/client';

export interface UpdateReviewDTO {
  mediaSono: number;
  DificuldadeParaDormir: DificuldadeParaDormir;
  AcordaDescansado: AcordaDescansado;
  SofreComSonoDuranteODia: SofreComSonoDuranteODia;
  UsaTelaAntesDeDormir: UsaTelaAntesDeDormir;
  TemRotinaDeSono: boolean;
}
