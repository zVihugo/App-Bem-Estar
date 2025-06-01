import { RelatorioProps } from "../../../@types/RelatorioProps";
import { Relatorio } from "../../models/Relatorio";

export interface IRelatorioRepository {
  save(data: Relatorio): Promise<Relatorio>;
  findById(id: string): Promise<Relatorio | null>;
  findAllByUserId(userId: string): Promise<Relatorio[]>;
  delete(id: string): Promise<void>;
}