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

  public get title() {
    return this.props.title;
  }

  public get imageUrl() {
    return this.props.imageUrl;
  }

  public get type() {
    return this.props.type;
  }

  public toJSON(): DicaDTO {
    return {
      id: this.id,
      userId: this.userId,
      title: this.title,
      imageUrl: this.imageUrl,
      type: this.type,
    };
  }
}
