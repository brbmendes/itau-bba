export interface RequestModel{
    cnpj: string;
    dateAdesao: Date;
    dateEmissao: Date;
    empresa: string;
    minutos: number;
    plano: string;
    tarifa: string;
    vplano: string;
    _id?: string;
    id: number;
}