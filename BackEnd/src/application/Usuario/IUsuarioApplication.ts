import { AtualizarPerfilDTO } from '../../dtos/usuario/AtualizarPerfilDTO';
import { AtualizarSenhaDTO } from '../../dtos/usuario/AtualizarSenhaDTO';
import { UsuarioDTO } from '../../dtos/usuario/UsuarioDTO';

export interface IUsuarioApplication {
  find(id: string): Promise<UsuarioDTO>;
  findByEmail(email: string): Promise<UsuarioDTO>;
  updatePassword(id: string, data: AtualizarSenhaDTO): Promise<void>;
  updateProfile(id: string, data: AtualizarPerfilDTO): Promise<UsuarioDTO>;
  delete(id: string): Promise<void>;
}
