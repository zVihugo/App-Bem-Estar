import {
  DificuldadeParaDormir,
  AcordaDescansado,
  SofreComSonoDuranteODia,
  UsaTelaAntesDeDormir,
} from '@prisma/client';

export interface ReviewDTO {
  id: string;
  userId: string;
  mediaSono: number;
  dificuldadeParaDormir: DificuldadeParaDormir;
  acordaDescansado: AcordaDescansado;
  sofreComSonoDuranteODia: SofreComSonoDuranteODia;
  usaTelaAntesDeDormir: UsaTelaAntesDeDormir;
  TemRotinaDeSono: boolean;
}
