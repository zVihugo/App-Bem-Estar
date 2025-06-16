import { Role } from '@prisma/client';
import { UsuarioProps } from '../../@types/UsuarioProps';
import { UsuarioDTO } from '../../dtos/usuario/UsuarioDTO';

export class Usuario {
  constructor(private readonly props: UsuarioProps) {}

  public static create(props: UsuarioProps) {
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

  public getSenha(): string {
    return this.props.senha;
  }

  public get dataDeNascimento(): string {
    return this.props.dataDeNascimento;
  }

  public get faculdade(): string {
    return this.props.faculdade;
  }

  public get curso(): string {
    return this.props.curso;
  }

  public get role(): Role {
    return this.props.role;
  }

  public toJSON(): UsuarioDTO {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      dataDeNascimento: this.dataDeNascimento,
      faculdade: this.faculdade,
      curso: this.curso,
      role: this.role,
    };
  }
}
