export interface Event { // View of events joined with associated Doctor
    id: number;
    patient_id: number;
    start_time: string;
    end_time: string;
    type: string;
    doctor_id: number;
    first_name: string; // doctor first name, last name
    last_name: string;
}