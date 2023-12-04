export interface Event { // View of events joined with associated Doctor
    id: number;
    patient_id: number;
    start_time: Date;
    end_time: Date;
    type: string;
    doctor_id: number;
    doctor_first_name: string;
    doctor_last_name: string;
}