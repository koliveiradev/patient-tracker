import { useEffect, useState } from "react";
import { Patient } from "../models/Patient";
import PatientDrawer from "../components/PatientDrawer";
import { usePatientService } from "../services/Patient";
import { useLoaderData, useNavigate } from "react-router-dom";
import { DataTable } from "../components/PatientTable";
import { LineChart } from '@mui/x-charts/LineChart';
import PatientInfoForm from "../components/PatientInfoForm";

export function PatientInfoPage(props: any) {
    const patientService = usePatientService();
    const submitCallback = async (info: any) => {
        await patientService.updatePatientInfo(info.email, info.firstName, info.lastName, info.birthDate, info.sex, info.phone, info.insurance);
    };

    return <div className="m-6 rounded-2xl sm:w-full sm:max-w-sm bg-white h-full p-8 border border-gray-300">
            <PatientInfoForm submitCallback={submitCallback} toggleable={true}/>
           </div>;

}




