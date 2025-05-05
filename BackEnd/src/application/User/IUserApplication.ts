import { UpdatePasswordDTO } from '../../dtos/user/UpdatePasswordDTO';
import { UpdateProfileDTO } from '../../dtos/user/UpdateProfileDTO';
import { UserDTO } from '../../dtos/user/UserDTO';

export interface IUserApplication {
  find(id: string): Promise<UserDTO>;
  findByEmail(email: string): Promise<UserDTO>;
  updatePassword(id: string, data: UpdatePasswordDTO): Promise<void>;
  updateProfile(id: string, data: UpdateProfileDTO): Promise<UserDTO>;
  delete(id: string): Promise<void>;
}
