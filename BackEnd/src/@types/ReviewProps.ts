import {
  DificuldadeParaDormir,
  AcordaDescansado,
  SofreComSonoDuranteODia,
  UsaTelaAntesDeDormir
} from '@prisma/client';

export type ReviewProps = {
  id: string;
  userId: string;
  mediaSono: number;
  DificuldadeParaDormir: DificuldadeParaDormir;
  AcordaDescansado: AcordaDescansado;
  SofreComSonoDuranteODia: SofreComSonoDuranteODia;
  UsaTelaAntesDeDormir: UsaTelaAntesDeDormir;
  TemRotinaDeSono: boolean;
};
