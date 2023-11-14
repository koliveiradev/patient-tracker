import { useEffect, useState } from "react";
import { Patient } from "../models/Patient";
import PatientDrawer from "../components/PatientDrawer";
import { usePatientService } from "../services/Patient";
import { useLoaderData, useNavigate } from "react-router-dom";
import { DataTable } from "../components/PatientTable";
import { LineChart } from '@mui/x-charts/LineChart';
import PatientInfoForm from "../components/PatientInfo";
import { supabase } from '../components/AuthBuilder';
import { AuthService, useAuthService } from "../services/Auth";

export function PatientInfoPage(props: any) {
    const authService = useAuthService();
    const submitCallback = async (info: any) => {
        //await authService.signUpWithEmail(info.email, info.password, info.firstName, info.lastName, info.birthDate, info.sex, info.phone, info.insurance);
    };
    return <PatientInfoForm submitCallback={submitCallback} toggleable={true}/>

}



