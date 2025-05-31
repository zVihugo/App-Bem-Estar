import { RelatorioProps } from '../../@types/RelatorioProps';

export class Relatorio {
  constructor(private readonly props: RelatorioProps) {}

  public static create(props: RelatorioProps) {
    return new Relatorio(props);
  }

  public get userId(){
    return this.props.userId;
  }
  
  public get usoDeTelasAntesDeDormir() {
    return this.props.usoDeTelasAntesDeDormir;
  }

  public get cansacoAoAcordar() {
    return this.props.cansacoAoAcordar;
  }

  public get dificuldadeParaDormir() {
    return this.props.dificuldadeParaDormir;
  }

  public get mediaSono() {
    return this.props.mediaSono;
  }

  public get sonolenciaDiurna() {
    return this.props.sonolenciaDiurna;
  }

  public get regularidadeRotina() {
    return this.props.regularidadeRotina;
  }
}
