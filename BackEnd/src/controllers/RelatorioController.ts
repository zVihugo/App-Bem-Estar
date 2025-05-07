import { Request, Response } from 'express';
import { IRelatorioApplication } from '../application/Relatorio/IRelatorioApplication';

export class RelatorioController {
  constructor(private readonly relatorioApplication: IRelatorioApplication) {}

  public static build(relatorioApplication: IRelatorioApplication) {
    return new RelatorioController(relatorioApplication);
  }

  public async find(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const relatorio = await this.relatorioApplication.find(id);

      return response.status(200).json({ relatorio: relatorio });
    } catch (error) {
      if (error instanceof Error){

      }
    }
  }

  public async findByUserId(request: Request, response: Response) {
    try {
      const { userId } = request.params;

      const relatorios = await this.relatorioApplication.findAllByUserId(userId);

      return response.status(200).json({ relatorios: relatorios });
    } catch (error) {
      if (error instanceof Error){

      }
    }
  }

  public async delete(request: Request, response: Response) {
    try {
      const { id } = request.params;

      await this.relatorioApplication.delete(id);

      return response
        .status(200)
        .json({ message: 'Relatório deletado com sucesso.' });
    } catch (error) {
      if (error instanceof Error){
        
      }
        
    }
  }
}
