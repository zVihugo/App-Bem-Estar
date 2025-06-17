import {
  DificuldadeParaDormir,
  AcordaDescansado,
  SofreComSonoDuranteODia,
  UsaTelaAntesDeDormir,
} from '@prisma/client';

export const dificuldadeMap: Record<DificuldadeParaDormir, number> = {
  nunca: 1,
  raramente: 2,
  algumas_vezes: 3,
  frequentemente: 4,
  quase_sempre: 5,
};

export const acordaDescansadoMap: Record<AcordaDescansado, number> = {
  nunca: 1,
  raramente: 2,
  algumas_vezes: 3,
  sempre: 4,
};

export const sofreSonoDiaMap: Record<SofreComSonoDuranteODia, number> = {
  nunca: 1,
  raramente: 2,
  frequentemente: 3,
  sempre: 4,
};

export const usaTelaAntesMap: Record<UsaTelaAntesDeDormir, number> = {
  nunca: 1,
  raramente: 2,
  algumas_vezes: 3,
  quase_sempre: 4,
  sempre: 5,
};

export const dificuldadeMapInvertido: Record<number, DificuldadeParaDormir> = {
  1: 'nunca',
  2: 'raramente',
  3: 'algumas_vezes',
  4: 'frequentemente',
  5: 'quase_sempre',
};

export const acordaDescansadoInvertido: Record<number, AcordaDescansado> = {
  1: 'nunca',
  2: 'raramente',
  3: 'algumas_vezes',
  4: 'sempre',
};

export const sofreSonoDiaInvertido: Record<number, SofreComSonoDuranteODia> = {
  1: 'nunca',
  2: 'raramente',
  3: 'frequentemente',
  4: 'sempre',
};

export const usaTelaAntesInvertido: Record<number, UsaTelaAntesDeDormir> = {
  1: 'nunca',
  2: 'raramente',
  3: 'algumas_vezes',
  4: 'quase_sempre',
  5: 'sempre',
};
