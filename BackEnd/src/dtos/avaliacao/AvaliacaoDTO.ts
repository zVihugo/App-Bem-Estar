import {
  DificuldadeParaDormir,
  AcordaDescansado,
  SofreComSonoDuranteODia,
  UsaTelaAntesDeDormir,
} from '@prisma/client';

export interface AvaliacaoDTO {
  id: string;
  userId: string;
  mediaSono: number;
  dificuldadeParaDormir: DificuldadeParaDormir;
  acordaDescansado: AcordaDescansado;
  sofreComSonoDuranteODia: SofreComSonoDuranteODia;
  usaTelaAntesDeDormir: UsaTelaAntesDeDormir;
  temRotinaDeSono: boolean;
  createdAt: Date;
}
