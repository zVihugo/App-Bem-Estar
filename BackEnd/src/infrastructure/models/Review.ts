import { ReviewProps } from '../../@types/ReviewProps';
import { ReviewDTO } from '../../dtos/review/ReviewDTO';

export class Review {
  constructor(private readonly props: ReviewProps) {}

  public static create(props: ReviewProps) {
    return new Review(props);
  }

  public get id() {
    return this.props.id;
  }

  public get userId() {
    return this.props.userId;
  }

  public get acordaDescansado() {
    return this.props.AcordaDescansado;
  }

  public get mediaSono() {
    return this.props.mediaSono;
  }

  public get dificuldadeParaDormir() {
    return this.props.DificuldadeParaDormir;
  }

  public get sofreComSonoDuranteODia() {
    return this.props.SofreComSonoDuranteODia;
  }

  public get usaTelaAntesDeDormir() {
    return this.props.UsaTelaAntesDeDormir;
  }

  public get hasRoutineSleep() {
    return this.props.hasRoutineSleep;
  }

  public toJSON(): ReviewDTO {
    return {
      id: this.id,
      userId: this.userId,
      mediaSono: this.mediaSono,
      dificuldadeParaDormir: this.dificuldadeParaDormir,
      acordaDescansado: this.acordaDescansado,
      usaTelaAntesDeDormir: this.usaTelaAntesDeDormir,
      sofreComSonoDuranteODia: this.sofreComSonoDuranteODia,
      hasRoutineSleep: this.hasRoutineSleep,
    };
  }
}
