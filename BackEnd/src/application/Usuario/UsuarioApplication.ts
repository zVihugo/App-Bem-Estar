import bcrypt from 'bcrypt';
import { AtualizarPerfilDTO } from '../../dtos/usuario/AtualizarPerfilDTO';
import { AtualizarSenhaDTO } from '../../dtos/usuario/AtualizarSenhaDTO';
import { UsuarioDTO } from '../../dtos/usuario/UsuarioDTO';
import { passwordHash } from '../../helpers/passwordHash';
import { IUsuarioRepository } from '../../infrastructure/repositories/Usuario/IUsuarioRepository';
import { IUsuarioApplication } from './IUsuarioApplication';

export class UsuarioApplication implements IUsuarioApplication {
  private constructor(readonly repository: IUsuarioRepository) {}

  public static build(repository: IUsuarioRepository) {
    return new UsuarioApplication(repository);
  }

  public async find(id: string): Promise<UsuarioDTO> {
    const user = await this.repository.find(id);
    if (!user) throw new Error('Usuário não encontrado.');

    return user.toJSON();
  }

  public async findByEmail(email: string): Promise<UsuarioDTO> {
    const user = await this.repository.findByEmail(email);
    if (!user) throw new Error('Usuário não encontrado.');

    return user.toJSON();
  }

  public async updatePassword(
    id: string,
    data: AtualizarSenhaDTO
  ): Promise<void> {
    const user = await this.repository.find(id);
    if (!user) throw new Error('Usuário não encontrado.');

    const isMatch = await bcrypt.compare(data.senhaAntiga, user.getSenha());
    if (!isMatch) throw new Error('Senha antiga inválida.');

    const newPasswordEncrypted = passwordHash(data.novaSenha);

    await this.repository.updatePassword(id, newPasswordEncrypted);
  }

  public async updateProfile(
    id: string,
    data: AtualizarPerfilDTO
  ): Promise<UsuarioDTO> {
    const userExists = await this.repository.find(id);
    if (!userExists) throw new Error('Usuário não encontrado.');

    const updated = await this.repository.updateProfile(id, data);

    return updated.toJSON();
  }

  public async delete(id: string): Promise<void> {
    const user = await this.repository.find(id);
    if (!user) throw new Error('Usuário não encontrado.');

    await this.repository.delete(id);
  }
}
