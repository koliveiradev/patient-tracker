import { Diagnosis } from "./Diagnosis";
import { Medication } from "./Medication";
import { Prescription } from "./Prescription";

export interface Visit {
    id: number;
    patient_id: number;
    start_time: string;
    end_time: string;
    type: string;
    diagnosis: Diagnosis[];
}





