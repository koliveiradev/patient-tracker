import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Patient, PatientData } from '../models/Patient';
import { getAge } from '../util/dates';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { CloseOutlined } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { usePatientService } from '../services/Patient';
import { AppBreadcrumbs } from '../components/BreadCrumbs';
import VisistTimeline from '../components/VisitTimeline';
import { DatePicker, DateTimePicker, MobileDateTimePicker, TimePicker } from '@mui/x-date-pickers';
import dateFormat, { masks } from "dateformat";
import { AddVisitDialog } from '../components/AddVisitDialog';
import { Diagnosis } from '../models/Diagnosis';
import { Visit } from '../models/Visit';


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

        return [];
    }
    React.useEffect(
        () => {
            if (loading) {
                service.getPatientData(patientId!).then((p) => {

                    setPatient(p);
                    setLoading(false);
                    setDiagnoses(getCurrentDiagnoses(p.events));
                });
            }


        }
    );

    return (
        <div className='p-12 w-full'>
            <AppBreadcrumbs />

            {patient !== null ? (
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

                            <AddVisitDialog />

                        </div>
                        <VisistTimeline visits={patient.events} />
                    </div>
                </div>


            ) : <></>}




        </div>
    );
}

