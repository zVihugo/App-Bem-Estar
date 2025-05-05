import { UserProps } from '../../../@types/UserProps';
import { User } from '../../models/User';

export interface IUserRepository {
  save(data: User): Promise<User>;
  find(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  updatePassword(id: string, password: string): Promise<void>;
  updateProfile(
    id: string,
    data: Partial<Omit<UserProps, 'id' | 'email' | 'password'>>
  ): Promise<User>;
  delete(id: string): Promise<void>;
}
