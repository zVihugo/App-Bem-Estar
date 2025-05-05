import { UserDTO } from './UserDTO';

export interface AuthResponseDTO {
  token: string;
  user: UserDTO;
}
