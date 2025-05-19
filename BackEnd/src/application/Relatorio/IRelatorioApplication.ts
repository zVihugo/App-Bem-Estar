import { RelatorioDTO } from "../../dtos/relatorio/RelatorioDTO";

export interface IRelatorioApplication {
    find(id: string): Promise<RelatorioDTO>;
    findAllByUserId(email: string): Promise<RelatorioDTO[]>;
    findLast7DaysReviews(userId: string): Promise<RelatorioDTO[]>;
    findLast30DaysReviews(userId: string): Promise<RelatorioDTO[]>;
    delete(id: string): Promise<void>;
}