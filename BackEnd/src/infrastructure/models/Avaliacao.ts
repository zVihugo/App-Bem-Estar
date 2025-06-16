import { AvaliacaoProps } from '../../@types/AvaliacaoProps';
import { AvaliacaoDTO } from '../../dtos/avaliacao/AvaliacaoDTO';

export class Avaliacao {
  constructor(private readonly props: AvaliacaoProps) {}

  public static create(props: AvaliacaoProps) {
    return new Avaliacao(props);
  }

  public get id() {
    return this.props.id;
  }

  public get userId() {
    return this.props.userId;
  }

  public get acordaDescansado() {
    return this.props.acordaDescansado;
  }

  public get mediaSono() {
    return this.props.mediaSono;
  }

  public get dificuldadeParaDormir() {
    return this.props.dificuldadeParaDormir;
  }

  public get sofreComSonoDuranteODia() {
    return this.props.sofreComSonoDuranteODia;
  }

  public get usaTelaAntesDeDormir() {
    return this.props.usaTelaAntesDeDormir;
  }

  public get temRotinaDeSono() {
    return this.props.temRotinaDeSono;
  }

  public get createdAt() {
    return this.props.createdAt;
  }

  public toJSON(): AvaliacaoDTO {
    return {
      id: this.id,
      userId: this.userId,
      mediaSono: this.mediaSono,
      dificuldadeParaDormir: this.dificuldadeParaDormir,
      acordaDescansado: this.acordaDescansado,
      usaTelaAntesDeDormir: this.usaTelaAntesDeDormir,
      sofreComSonoDuranteODia: this.sofreComSonoDuranteODia,
      temRotinaDeSono: this.temRotinaDeSono,
      createdAt: this.createdAt,
    };
  }
}
