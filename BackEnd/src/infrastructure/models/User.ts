import { UserProps } from '../../@types/UserProps';

export class Usuario {
  constructor(private readonly props: UserProps) {}

  public static create(props: UserProps) {
    return new Usuario(props);
  }

  public get id(): string {
    return this.props.id;
  }

  public get name(): string {
    return this.props.name;
  }

  public get email(): string {
    return this.props.email;
  }

  public getPassword(): string {
    return this.props.password;
  }

  public get dataNascimento(): string {
    return this.props.dataNascimento;
  }

  public get faculdade(): string {
    return this.props.faculdade;
  }

  public get curso(): string {
    return this.props.curso;
  }
}
