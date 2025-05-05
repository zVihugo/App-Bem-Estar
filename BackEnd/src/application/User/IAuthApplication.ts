import { AuthResponseDTO } from '../../dtos/user/AuthResponseDTO';
import { LoginDTO } from '../../dtos/user/LoginDTO';
import { RegisterDTO } from '../../dtos/user/RegisterDTO';
import { UserDTO } from '../../dtos/user/UserDTO';

export interface IAuthApplication {
  register(data: RegisterDTO): Promise<UserDTO>;
  login(data: LoginDTO): Promise<AuthResponseDTO>;
}
