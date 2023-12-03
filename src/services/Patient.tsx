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
        const { data, error } = await supabase.from('patients').select('* events()').filter('id', 'eq', id).limit(1).single();

        return data;
    }

    async getPatientData(id: string): Promise<any> {
        const { data, error } = await supabase.from('patients').select('*, events ( *, diagnoses ( *, illness:illness_id ( * ), prescriptions (*,medication:medication_id(*)) ) )').filter('id', 'eq', id).limit(1).single();
        console.log(data);
        return data;
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



