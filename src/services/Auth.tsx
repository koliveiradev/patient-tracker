import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { supabase } from "../components/AuthBuilder";
import { createContext, useContext } from "react";



export class AuthService {

    async signInWithEmail(email: string, password: string) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })
    }

    async signUpWithEmail(email: string, password: string) {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,

        });

        await this.signInWithEmail(email, password);
    }

    async signOut() {
        await supabase.auth.signOut();
    }

}

const service = new AuthService();

const authServiceContext = createContext<AuthService>(service);

export function useAuthService() {
    return useContext(authServiceContext);
}



export function AuthServiceProvider(props: any) {



    return (<authServiceContext.Provider value={service}>

        {props.children}
    </authServiceContext.Provider>)

}



