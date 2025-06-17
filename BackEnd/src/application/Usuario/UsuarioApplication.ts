import bcrypt from 'bcrypt';
import { AtualizarPerfilDTO } from '../../dtos/usuario/AtualizarPerfilDTO';
import { AtualizarSenhaDTO } from '../../dtos/usuario/AtualizarSenhaDTO';
import { UsuarioDTO } from '../../dtos/usuario/UsuarioDTO';
import { passwordHash } from '../../helpers/passwordHash';
import { IAvaliacaoRepository } from '../../infrastructure/repositories/Avaliacao/IAvaliacaoRepository';
import { IDicaRepository } from '../../infrastructure/repositories/Dica/IDicaRepository';
import { IMetaRepository } from '../../infrastructure/repositories/Metas/IMetasRepository';
import { IRelatorioRepository } from '../../infrastructure/repositories/Relatorio/IRelatorioRepository';
import { IUsuarioRepository } from '../../infrastructure/repositories/Usuario/IUsuarioRepository';
import { IUsuarioApplication } from './IUsuarioApplication';

export class UsuarioApplication implements IUsuarioApplication {
  private constructor(
    private readonly usuarioRepository: IUsuarioRepository,
    private readonly avaliacaoRepository: IAvaliacaoRepository,
    private readonly relatorioRepository: IRelatorioRepository,
    private readonly dicaRepository: IDicaRepository,
    private readonly metaRepository: IMetaRepository
  ) {}

  public static build(
    usuarioRepository: IUsuarioRepository,
    avaliacaoRepository: IAvaliacaoRepository,
    relatorioRepository: IRelatorioRepository,
    dicaRepository: IDicaRepository,
    metaRepository: IMetaRepository
  ) {
    return new UsuarioApplication(
      usuarioRepository,
      avaliacaoRepository,
      relatorioRepository,
      dicaRepository,
      metaRepository
    );
  }

  public async find(id: string): Promise<UsuarioDTO> {
    const user = await this.usuarioRepository.find(id);
    if (!user) throw new Error('Usuário não encontrado.');

    return user.toJSON();
  }

  public async findByEmail(email: string): Promise<UsuarioDTO> {
    const user = await this.usuarioRepository.findByEmail(email);
    if (!user) throw new Error('Usuário não encontrado.');

    return user.toJSON();
  }

  public async updatePassword(
    id: string,
    data: AtualizarSenhaDTO
  ): Promise<void> {
    const user = await this.usuarioRepository.find(id);
    if (!user) throw new Error('Usuário não encontrado.');

    const isMatch = await bcrypt.compare(data.senhaAntiga, user.getSenha());
    if (!isMatch) throw new Error('Senha antiga inválida.');

    const newPasswordEncrypted = passwordHash(data.novaSenha);

    await this.usuarioRepository.updatePassword(id, newPasswordEncrypted);
  }

  public async updateProfile(
    id: string,
    data: AtualizarPerfilDTO
  ): Promise<UsuarioDTO> {
    const userExists = await this.usuarioRepository.find(id);
    if (!userExists) throw new Error('Usuário não encontrado.');

    const updated = await this.usuarioRepository.updateProfile(id, data);

    return updated.toJSON();
  }

  public async delete(id: string): Promise<void> {
    const user = await this.usuarioRepository.find(id);
    if (!user) throw new Error('Usuário não encontrado.');

    await this.avaliacaoRepository.deleteByUserId(id);
    await this.relatorioRepository.deleteByUserId(id);
    await this.dicaRepository.deleteByUserId(id);
    await this.metaRepository.deleteByUserId(id);
    await this.usuarioRepository.delete(id);
  }
}
