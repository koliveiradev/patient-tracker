import * as React from 'react';

import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Patient, PatientData } from '../models/Patient';
import { getAge } from '../util/dates';
import { Breadcrumbs, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, IconButton, InputLabel, Link, MenuItem, Select, TextField, Typography } from '@mui/material';
import { CloseOutlined } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { usePatientService } from '../services/Patient';
import { AppBreadcrumbs } from '../components/BreadCrumbs';
import VisistTimeline from '../components/VisitTimeline';
import dateFormat, { masks } from "dateformat";
import { AddVisitDialog, VisitDialogForm } from '../components/AddVisitDialog';
import { Diagnosis } from '../models/Diagnosis';
import { Visit } from '../models/Visit';
import { BrowserRouter as Router, Link as RouterLink } from "react-router-dom";


export default function PatientPage(props: any) {
    let { patientId } = useParams();
    const [patient, setPatient] = React.useState<PatientData | null>(null);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [diagnoses, setDiagnoses] = React.useState<Diagnosis[]>([]);
    const service = usePatientService();
    const getCurrentDiagnoses = (visits: Visit[]) => {


        const diagnoses = visits.map((e) => {
            return e.diagnoses;
        }).flat().filter(e => {
            return e.prescriptions.some(p => new Date(p.end_date) >= new Date());
        });
        return diagnoses;


    }
    React.useEffect(
        () => {
            if (loading) {
                refresh();
            }


        }
    );

    const refresh = () => {
        service.getPatientData(patientId!).then((p) => {

            setPatient(p);
            setLoading(false);
            setDiagnoses(getCurrentDiagnoses(p.events));
        });
    }
    const handleSubmit = (v: VisitDialogForm) => {

        service.addVisit({
            start_time: new Date(v.start_time).toISOString(),
            end_time: new Date(v.start_time.getTime() + v.duration * 60000).toISOString(),
            type: v.type,
            patient_id: patient!.id!,
            doctor_id: 1
        }).then((v) => {
            refresh();
        });
    }

    const handleDelete = (id: number) => {
        service.deleteVisit(id).then(() => {
            refresh();
        });
    }

    return (
        <div className='p-12 w-full'>

            {patient !== null ? (
                <div>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" to="/patients" component={RouterLink} >
                            Patients
                        </Link>

                        <Typography color="text.primary">{patient.first_name} {patient.last_name}</Typography>
                    </Breadcrumbs>
                    <div className='flex flex-col items-start justify-start w-full'>
                        <div className='flex flex-row items-center justify-start w-full border-b border-gray-300 mb-2 py-1'>
                            <h1 className='text-2xl font-semibold mr-auto'>
                                Patient Summary
                            </h1>

                        </div>

                        <div className='  border border-gray-200 rounded-lg w-full p-6 bg-white mt-4 '>
                            <div className='flex flex-row gap-16'>
                                <div>
                                    <div className='flex flex-row gap-8 border-b border-gray-300 mb-4 pb-3 items-center '>
                                        <h1 className='text-xl font-semibold '>
                                            {patient.first_name} {patient.last_name}
                                        </h1>


                                    </div>
                                    <h2 className=' mt-1'>
                                        <span className='font-semibold'>Age:</span> {getAge(patient.birth)}
                                    </h2>
                                    <h2 className=''>
                                        <span className='font-semibold'>Sex:</span> {patient.sex}
                                    </h2>
                                    <h2 className=''>
                                        <span className='font-semibold'>Birth:</span> {dateFormat(patient.birth, "mmmm dS, yyyy")}
                                    </h2>
                                    <h2 className=''>
                                        <span className='font-semibold'>Insurance:</span> {patient.insurance}
                                    </h2>
                                </div>
                                <div>
                                    <div className='font-semibold'>
                                        Diagnoses
                                    </div>
                                    {
                                        diagnoses.map((diagnosis) => {
                                            return <div className='font-medium text-sm'>
                                                • {diagnosis.illness.name}
                                            </div>
                                        })
                                    }
                                </div>
                                <div>
                                    <div className='font-semibold'>
                                        Prescriptions
                                    </div>
                                    {
                                        diagnoses.map((d) => d.prescriptions).flat().map((p) => {
                                            return <div className='font-medium text-sm'>
                                                • {p.medication.name}
                                            </div>
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='  border border-gray-200 rounded-lg w-full p-6 bg-white mt-4 '>
                            <div className='flex flex-row gap-8 border-b border-gray-300 mb-4 pb-3 items-center '>
                                <h1 className='text-xl font-semibold '>
                                    Medical History
                                </h1>

                                <AddVisitDialog onSubmit={handleSubmit} />

                            </div>
                            <VisistTimeline visits={patient.events} onDelete={handleDelete} />
                        </div>
                    </div>

                </div>
            ) : <></>}




        </div>
    );
}

