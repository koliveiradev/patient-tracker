import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { supabase } from "../components/AuthBuilder";
import { createContext, useContext } from "react";
import { Medication } from "../models/Medication";



export class MedicationService {

    async getMedications(): Promise<any> {
        const { data, error } = await supabase.from('medications').select('*');

        return data;
    }

}

const service = new MedicationService();

const authServiceContext = createContext<MedicationService>(service);

export function useMedicationService() {
    return useContext(authServiceContext);
}



export function MedicationServiceProvider(props: any) {

    return (<authServiceContext.Provider value={service}>
        {props.children}
    </authServiceContext.Provider>)

}



