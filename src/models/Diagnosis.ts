import { Prescription } from "./Prescription";

export interface Diagnosis {
    id: number;
    illness: Illness;
    prescriptions: Prescription[];
}

export interface Illness {
    id: number;
    name: string;
}