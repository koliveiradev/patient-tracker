import { Medication } from "./Medication";

export interface Prescription {
    id: number;
    visit_id: number;
    start_date: string;
    end_date: string;
    medication: Medication;
    notes: string;
}