import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { supabase } from "../components/AuthBuilder";
import { createContext, useContext } from "react";
import { Patient } from "../models/Patient";



export class DatabaseService {

    async getPatients(): Promise<any> {
        const { data, error } = await supabase.from('patients').select('*');

        return data;
    }

    async getPatient(id: string): Promise<any> {
        const { data, error } = await supabase.from('patients').select('* events()').filter('id', 'eq', id).limit(1).single();

        return data;
    }

    async getPatientByEmail(email: string): Promise<any> {
        const { data, error } = await supabase.from('patients').select('*').filter('email', 'eq', email).limit(1).single();

        return data;
    }

    async updatePatientInfo(email:string, first: string, last: string, birth: string, sex: string, phone: string, insurance: string): Promise<any> {
        let newData = {
            first_name: first, 
            last_name: last, 
            birth: birth, 
            sex: sex,
            phone: phone,
            insurance: insurance 
        };
        const {data, error} = await supabase.from('patients').update(newData).filter('email', 'eq', email);
        console.log(data);
        return data;
    }

    async getPatientData(id: string): Promise<any> {
        const { data, error } = await supabase.from('patients').select('*, events ( *, diagnoses ( *, illness:illness_id ( * ), prescriptions (*,medication:medication_id(*)) ) )').filter('id', 'eq', id).limit(1).single();
        console.log(data);
        return data;
    }

    async getVisit(id: string): Promise<any> {
        const { data, error } = await supabase.from('events').select('*, diagnoses ( *, illness:illness_id ( * ), prescriptions (*,medication:medication_id(*)) ) ').filter('id', 'eq', id).limit(1).single();
        return data;
    }
    async getVisits(): Promise<any> {
        const { data, error } = await supabase.from('events').select('*, patient:patient_id(*), diagnoses ( *, illness:illness_id ( * ), prescriptions (*,medication:medication_id(*)) ) ');
        return data;
    }


    async getMedications(): Promise<any> {
        const { data, error } = await supabase.from('medications').select('*');

        return data;
    }

    async getIllnesses(): Promise<any> {
        const { data, error } = await supabase.from('illnesses').select('*');

        return data;
    }


}

const service = new DatabaseService();

const authServiceContext = createContext<DatabaseService>(service);

export function usePatientService() {
    return useContext(authServiceContext);
}



export function PatientServiceProvider(props: any) {



    return (<authServiceContext.Provider value={service}>

        {props.children}
    </authServiceContext.Provider>)

}



