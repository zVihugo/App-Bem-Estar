import { RelatorioProps } from '../../@types/RelatorioProps';

export class Relatorio {
  constructor(private readonly props: RelatorioProps) {}

  public static create(props: RelatorioProps) {
    return new Relatorio(props);
  }

  public get id() {
    return this.props.id;
  }

  public get title() {
    return this.props.title;
  }

  public get description() {
    return this.props.description;
  }

  public get result() {
    return this.props.result;
  }

  public get feelingEmoticon() {
    return this.props.feelingEmoticon;
  }

  public get userId() {
    return this.props.userId;
  }
}
