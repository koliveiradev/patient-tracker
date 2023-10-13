import { useEffect, useState } from "react";
import { Patient } from "../models/Patient";
import PatientDrawer from "../components/PatientDrawer";
import { usePatientService } from "../services/Patient";
import { useLoaderData } from "react-router-dom";
import { DataTable } from "../components/PatientTable";


export function PatientsPage(props: any) {
    const [patient, setPatient] = useState<Patient | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [patients, setPatients] = useState<Patient[]>([]); // [1
    const service = usePatientService();
    const handleSetPatient = (patient: Patient | null) => {
        setPatient(patient);
    }
    useEffect(
        () => {
            if (loading) {
                service.getPatients().then((patients) => {
                    setPatients(patients);
                    setLoading(false);
                    console.log(patients);
                });
            }


        }
    );

    return <div className="p-8 h-screen w-full">
        <PatientDrawer patient={patient} setPatient={handleSetPatient}></PatientDrawer>
        <DataTable setPatient={handleSetPatient} patients={patients}></DataTable></div>;

}

