import { UsuarioProps } from '../../../@types/UsuarioProps';
import { Usuario } from '../../models/Usuario';

export interface IUsuarioRepository {
  save(data: Usuario): Promise<Usuario>;
  find(id: string): Promise<Usuario | null>;
  findByEmail(email: string): Promise<Usuario | null>;
  updatePassword(id: string, senha: string): Promise<void>;
  updateProfile(
    id: string,
    data: Partial<Omit<UsuarioProps, 'id' | 'email' | 'senha'>>
  ): Promise<Usuario>;
  delete(id: string): Promise<void>;
}
