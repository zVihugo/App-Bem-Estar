import {
  DificuldadeParaDormir,
  AcordaDescansado,
  SofreComSonoDuranteODia,
  UsaTelaAntesDeDormir,
} from '@prisma/client';

export type AvaliacaoProps = {
  id: string;
  userId: string;
  mediaSono: number;
  dificuldadeParaDormir: DificuldadeParaDormir;
  acordaDescansado: AcordaDescansado;
  sofreComSonoDuranteODia: SofreComSonoDuranteODia;
  usaTelaAntesDeDormir: UsaTelaAntesDeDormir;
  temRotinaDeSono: boolean;
  createdAt: Date;
};
