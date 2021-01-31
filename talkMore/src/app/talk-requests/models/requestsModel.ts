import { TalkMorePlan } from "src/app/shared/utils/enum";

export interface RequestsModel {
    id: number;
    company: string;
    cnpj: string;
    plan: number;
    tariff: number;
    minutes: number;
    planValue: number;
    accessionDate: Date;
    sendDate: Date;
}