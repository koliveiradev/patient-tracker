import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { supabase } from "../components/AuthBuilder";
import { createContext, useContext } from "react";
import { Patient } from "../models/Patient";

export class PatientService {

    async getPatients(): Promise<any> {
        const { data, error } = await supabase.from('patients').select('*');

        return data;
    }

    async getPatient(id: string): Promise<any> {
        const { data, error } = await supabase.from('patients').select('*').filter('id', 'eq', id).limit(1).single();
        
        return data;
    }
    
    async getPatientID(email: string): Promise<any> {
        const { data, error } = await supabase.from('patients').select('*').filter('email', 'eq', email).limit(1).single();
        return data.id;
    }

    async getPrescription(id: string): Promise<any> {
        // the type from the filter is incorrect, and believes that medications is an
        // array, rather than a single object. We must ignore its type signature unfortunately
        const { data, error } = await supabase
            .from('prescriptions')
            .select('start_date, medications!inner(name), diagnoses!inner(events!inner(patients!inner(*)))')
            .filter('diagnoses.events.patients.id', 'eq', id);

        // @ts-ignore
        return data?.map((e, idx) => ({name: e.medications.name, key: idx, prescribedOn: e.start_date}));             
    }

}

const service = new PatientService();

const authServiceContext = createContext<PatientService>(service);

export function usePatientService() {
    return useContext(authServiceContext);
}



export function PatientServiceProvider(props: any) {



    return (<authServiceContext.Provider value={service}>

        {props.children}
    </authServiceContext.Provider>)

}



