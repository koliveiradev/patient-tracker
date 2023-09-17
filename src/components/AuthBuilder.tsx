import React, { useContext, createContext, useState, useEffect } from "react";

import { Session, createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'



export const supabase = createClient('https://ygpsrqqtbcvfnjozuoug.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlncHNycXF0YmN2Zm5qb3p1b3VnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ3MTI2MzYsImV4cCI6MjAxMDI4ODYzNn0.UwpUvxNaGAW6_igp5Aqz91qJKi5Vub9nVSRJg_f5b5U')
const authContext = createContext<Session | null>(null);

export function useAuth() {
    return useContext(authContext);
}



export function AuthProvider(props: any) {
    const [session, setSession] = useState<Session | null>(null)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        })

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        })

        return () => subscription.unsubscribe()
    }, [])


    return (<authContext.Provider value={session}>

        {props.children}
    </authContext.Provider>)

}



