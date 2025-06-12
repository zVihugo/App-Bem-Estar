import { UsuarioDTO } from './UsuarioDTO';

export interface AuthResponseDTO {
  token: string;
  user: UsuarioDTO;
}
