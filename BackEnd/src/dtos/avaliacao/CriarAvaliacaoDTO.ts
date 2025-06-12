import {
  DificuldadeParaDormir,
  AcordaDescansado,
  SofreComSonoDuranteODia,
  UsaTelaAntesDeDormir,
} from '@prisma/client';

export interface CriarAvaliacaoDTO {
  userId: string;
  date: Date;
  mediaSono: number;
  dificuldadeParaDormir: DificuldadeParaDormir;
  acordaDescansado: AcordaDescansado;
  sofreComSonoDuranteODia: SofreComSonoDuranteODia;
  usaTelaAntesDeDormir: UsaTelaAntesDeDormir;
  temRotinaDeSono: boolean;
  createdAt: Date;
}
