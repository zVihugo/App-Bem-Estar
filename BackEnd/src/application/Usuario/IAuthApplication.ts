import { AuthResponseDTO } from '../../dtos/usuario/AuthResponseDTO';
import { LoginDTO } from '../../dtos/usuario/LoginDTO';
import { RegistroDTO } from '../../dtos/usuario/RegistroDTO';
import { UsuarioDTO } from '../../dtos/usuario/UsuarioDTO';

export interface IAuthApplication {
  register(data: RegistroDTO): Promise<UsuarioDTO>;
  login(data: LoginDTO): Promise<AuthResponseDTO>;
}
