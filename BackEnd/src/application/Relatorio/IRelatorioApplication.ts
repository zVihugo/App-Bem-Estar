import { RelatorioDTO } from "../../dtos/relatorio/RelatorioDTO";

export interface IRelatorioApplication {
    find(id: string): Promise<RelatorioDTO>;
    findAllByUserId(email: string): Promise<RelatorioDTO[]>;
    delete(id: string): Promise<void>;
}