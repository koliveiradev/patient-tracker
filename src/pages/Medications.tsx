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
                });
            }


        }
    );

    return <main className="p-8 h-screen w-full">
        <div>
            <h1 className='text-2xl font-semibold'>Medications</h1>
            <div className='border-b border-gray-300 w-full mb-8 mt-4' />
        </div>
        <DataTable setPatient={handleSetPatient} medications={medications}></DataTable>
    </main>;

}




