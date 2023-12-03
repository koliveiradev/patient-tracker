import { Visit } from "./Visit";

export interface Patient {
    id: number;
    first_name: string;
    last_name: string;
    birth: string;
    sex: string;
    insurance: string;

}

export interface PatientData extends Patient {
    events: Visit[];
}