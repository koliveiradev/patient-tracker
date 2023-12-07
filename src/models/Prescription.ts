import { Medication } from "./Medication";

export interface Prescription {
    id: number;
    visit_id: number;
    start_date: string;
    end_date: string;
    medication: Medication;
    notes: string;
}

export interface DiagnosisAddForm {
    diagnosis_id?: number;
    prescription_id?: number;
    visit_id: number;
    illness_id: number;
    medication_id: number;
    start_date: Date;
    end_date: Date;
    notes: string;
}