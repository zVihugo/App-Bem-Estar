import { AvaliacaoDTO } from '../../dtos/avaliacao/AvaliacaoDTO';
import { RelatorioDTO } from '../../dtos/relatorio/RelatorioDTO';
import { prisma } from '../../infrastructure/bancoContext/prisma';
import { IAvaliacaoRepository } from '../../infrastructure/repositories/Avaliacao/IAvaliacaoRepository';
import { IRelatorioRepository } from '../../infrastructure/repositories/Relatorio/IRelatorioRepository';
import {
  dificuldadeMap,
  acordaDescansadoMap,
  sofreSonoDiaMap,
  usaTelaAntesMap,
  dificuldadeMapInvertido,
  acordaDescansadoInvertido,
  sofreSonoDiaInvertido,
  usaTelaAntesInvertido,
} from '../Helpers/EnumsMapper';
import { IRelatorioApplication } from './IRelatorioApplication';

export class RelatorioApplication implements IRelatorioApplication {
  private constructor(
    readonly repository: IRelatorioRepository,
    readonly repositoryReview: IAvaliacaoRepository
  ) {}

  public static build(
    repository: IRelatorioRepository,
    repositoryReview: IAvaliacaoRepository
  ) {
    return new RelatorioApplication(repository, repositoryReview);
  }

  public async save(data: RelatorioDTO): Promise<RelatorioDTO> {
    const relatorioSave = await prisma.relatorio.create({
      data: {
        userId: data.userId,
        mediaSono: data.mediaSono,
        dificuldadeParaDormir: data.dificuldadeParaDormir,
        cansacoAoAcordar: data.cansacoAoAcordar,
        sonolenciaDiurna: data.sonolenciaDiurna,
        usoDeTelasAntesDeDormir: data.usoDeTelasAntesDeDormir,
        regularidadeRotina: data.regularidadeRotina,
      },
    });

    return relatorioSave;
  }

  public async find(id: string): Promise<RelatorioDTO> {
    const relatorio = await this.repository.findById(id);
    if (!relatorio) throw new Error('Usuário não encontrado.');
    return relatorio;
  }

  public async findAllByUserId(userId: string): Promise<AvaliacaoDTO[]> {
    const reviews = await this.repositoryReview.findAllByUserId(userId);

    if (!reviews) throw new Error('Usuário não encontrado.');

    return reviews;
  }

  public async findLastDaysReviews(
    userId: string,
    seteDias: boolean
  ): Promise<RelatorioDTO> {
    const reviews = await this.findAllByUserId(userId);

    const hoje = new Date();
    const seteDiasAtras = new Date();
    if (seteDias) seteDiasAtras.setDate(hoje.getDate() - 6);
    else seteDiasAtras.setDate(hoje.getDate() - 29);

    const reviewsFiltrados = reviews.filter((r) => {
      const dt = new Date(r.createdAt);
      return dt >= seteDiasAtras && dt <= hoje;
    });

    if (reviewsFiltrados.length === 0) {
      throw new RangeError('Usuário não possui avaliações nos últimos 7 dias.');
    }

    let somaSono = 0;
    let somaDificuldade = 0;
    let somaAcorda = 0;
    let somaSofreDia = 0;
    let somaUsaTela = 0;
    let countTemRotina = 0;

    for (const r of reviewsFiltrados) {
      somaSono += r.mediaSono;
      somaDificuldade += dificuldadeMap[r.dificuldadeParaDormir];
      somaAcorda += acordaDescansadoMap[r.acordaDescansado];
      somaSofreDia += sofreSonoDiaMap[r.sofreComSonoDuranteODia];
      somaUsaTela += usaTelaAntesMap[r.usaTelaAntesDeDormir];
      if (r.temRotinaDeSono) countTemRotina++;
    }

    const total = reviewsFiltrados.length;

    const mediaSono = parseFloat((somaSono / total).toFixed(2));
    const mediaDiffNum = Math.round(somaDificuldade / total);
    const mediaAcordaNum = Math.round(somaAcorda / total);
    const mediaSofreNum = Math.round(somaSofreDia / total);
    const mediaUsaTelaNum = Math.round(somaUsaTela / total);
    const percentualTemRotina =
      Math.round((countTemRotina / total) * 100) + '%';

    const mediaDificuldadeParaDormir =
      dificuldadeMapInvertido[mediaDiffNum] ?? 'nunca';
    const mediaAcordaDescansado =
      acordaDescansadoInvertido[mediaAcordaNum] ?? 'nunca';
    const mediaSofreSonoDia = sofreSonoDiaInvertido[mediaSofreNum] ?? 'nunca';
    const mediaUsaTelaAntes = usaTelaAntesInvertido[mediaUsaTelaNum] ?? 'nunca';

    return this.save({
      userId: userId,
      mediaSono: mediaSono.toString(),
      dificuldadeParaDormir: mediaDificuldadeParaDormir.toString(),
      cansacoAoAcordar: mediaAcordaDescansado.toString(),
      sonolenciaDiurna: mediaSofreSonoDia.toString(),
      usoDeTelasAntesDeDormir: mediaUsaTelaAntes.toString(),
      regularidadeRotina: percentualTemRotina,
    });
  }

  public async delete(id: string): Promise<void> {
    const relatorio = await this.repository.findById(id);
    if (!relatorio) throw new Error('Usuário não encontrado.');

    await this.repository.delete(id);
  }
}
