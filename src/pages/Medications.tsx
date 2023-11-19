import { useEffect, useState } from "react";
import { Medication } from "../models/Medication";
import { useMedicationService } from "../services/Medication";
import { useLoaderData, useNavigate } from "react-router-dom";
import { DataTable } from "../components/MedicationTable"; // make a new DataTable for medications?


export function MedicationsPage(props: any) {
    const [medication, setMedication] = useState<Medication | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [medications, setMedications] = useState<Medication[]>([]); 
    const service = useMedicationService();
    const navigate = useNavigate();

    const handleSetPatient = (patient: Medication) => {
        navigate("/patients/" + patient.id);

    }
    useEffect(
        () => {
            if (loading) {
                service.getMedications().then((medications) => {
                    setMedications(medications);
                    setLoading(false);
                    console.log(medications);
                });
            }


        }
    );

    return <div className="p-8 h-screen w-full">

        <DataTable setPatient={handleSetPatient} medications={medications}></DataTable>
    </div>;

}




