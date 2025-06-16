import { DicaProps } from '../../@types/Dica';
import { DicaDTO } from '../../dtos/dica/DicaDTO';

export class Dica {
  constructor(private readonly props: DicaProps) {}

  public static create(props: DicaProps) {
    return new Dica(props);
  }

  public get id() {
    return this.props.id;
  }

  public get userId() {
    return this.props.userId;
  }

  public get titulo() {
    return this.props.titulo;
  }

  public get thumbnailUrl() {
    return this.props.thumbnailUrl;
  }

  public get link() {
    return this.props.link;
  }

  public get tipo() {
    return this.props.tipo;
  }

  public toJSON(): DicaDTO {
    return {
      id: this.id,
      userId: this.userId,
      titulo: this.titulo,
      thumbnailUrl: this.thumbnailUrl,
      link: this.props.link,
      tipo: this.tipo,
    };
  }
}
