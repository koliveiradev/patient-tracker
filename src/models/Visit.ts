import { Diagnosis } from "./Diagnosis";
import { Medication } from "./Medication";
import { Patient } from "./Patient";
import { Prescription } from "./Prescription";

export interface Visit {
    id: number;
    patient_id: number;
    patient: Patient;
    start_time: string;
    end_time: string;
    type: string;
    diagnoses: Diagnosis[];
}





