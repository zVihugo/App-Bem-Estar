import { MetasProps } from '../../@types/Metas';
import { MetasDTO } from '../../dtos/metas/MetasDTO';

export class Metas {
  constructor(private readonly props: MetasProps) {}

  public static create(props: MetasProps) {
    return new Metas(props);
  }

  public get id() {
    return this.props.id;
  }

  public get userId() {
    return this.props.userId;
  }

  public get descricao() {
    return this.props.descricao;
  }

  public get isCompleted() {
    return this.props.isCompleted;
  }

  public toJSON(): MetasDTO {
    return {
      id: this.id,
      userId: this.userId,
      descricao: this.descricao,
      isCompleted: this.isCompleted,
    };
  }
}
