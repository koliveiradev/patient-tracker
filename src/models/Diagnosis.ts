import { Prescription } from "./Prescription";

export interface Diagnosis {
    id: number;
    illness: Illness;
    prescription: Prescription[];
}

export interface Illness {
    id: number;
    name: string;
}