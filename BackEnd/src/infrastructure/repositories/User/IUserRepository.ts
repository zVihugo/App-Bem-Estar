import { Usuario } from '../../models/User';

export interface IUserRepository {
  salvar(data: Usuario): Promise<Usuario>;
  buscar(id: string): Promise<Usuario | null>;
  buscarComEmail(email: string): Promise<Usuario | null>;
  atualizar(id: string, password: string): Promise<void>;
  deletar(id: string): Promise<void>;
}
