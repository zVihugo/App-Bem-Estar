import bcrypt from 'bcrypt';
import { UpdatePasswordDTO } from '../../dtos/user/UpdatePasswordDTO';
import { UpdateProfileDTO } from '../../dtos/user/UpdateProfileDTO';
import { UserDTO } from '../../dtos/user/UserDTO';
import { passwordHash } from '../../helpers/passwordHash';
import { IUserRepository } from '../../infrastructure/repositories/User/IUserRepository';
import { IUserApplication } from './IUserApplication';

export class UserApplication implements IUserApplication {
  private constructor(readonly repository: IUserRepository) {}

  public static build(repository: IUserRepository) {
    return new UserApplication(repository);
  }

  public async find(id: string): Promise<UserDTO> {
    const user = await this.repository.find(id);
    if (!user) throw new Error('Usuário não encontrado.');
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      dateOfBirth: user.dateOfBirth,
      faculty: user.faculty,
      course: user.course,
    };
  }

  public async findByEmail(email: string): Promise<UserDTO> {
    const user = await this.repository.findByEmail(email);
    if (!user) throw new Error('Usuário não encontrado.');

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      dateOfBirth: user.dateOfBirth,
      faculty: user.faculty,
      course: user.course,
    };
  }

  public async updatePassword(
    id: string,
    data: UpdatePasswordDTO
  ): Promise<void> {
    const user = await this.repository.find(id);
    if (!user) throw new Error('Usuário não encontrado.');

    const isMatch = await bcrypt.compare(data.oldPassword, user.getPassword());
    if (!isMatch) throw new Error('Senha antiga inválida.');

    const newPasswordEncrypted = passwordHash(data.newPassword);

    await this.repository.updatePassword(id, newPasswordEncrypted);
  }
  public async updateProfile(
    id: string,
    data: UpdateProfileDTO
  ): Promise<UserDTO> {
    const userExists = await this.repository.find(id);
    if (!userExists) throw new Error('Usuário não encontrado.');

    const updated = await this.repository.updateProfile(id, data);

    return {
      id: updated.id,
      name: updated.name,
      email: updated.email,
      dateOfBirth: updated.dateOfBirth,
      faculty: updated.faculty,
      course: updated.course,
    };
  }

  public async delete(id: string): Promise<void> {
    const user = await this.repository.find(id);
    if (!user) throw new Error('Usuário não encontrado.');

    await this.repository.delete(id);
  }
}
