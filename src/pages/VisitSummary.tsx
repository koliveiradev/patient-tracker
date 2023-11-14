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
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, IconButton, InputLabel, MenuItem, Select, TextField, capitalize } from '@mui/material';
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
import DiagnosisPoints from '../components/DiagnosisPoints';
import { AddDiagnosisDialog } from '../components/AddDiagnosisDialog';


export default function VisitPage(props: any) {
    let { visitId } = useParams();
    const [patient, setPatient] = React.useState<PatientData | null>(null);
    const [illnesses, setIllnesses] = React.useState<Diagnosis[]>([]);
    const [medications, setMedications] = React.useState<Diagnosis[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [visit, setVisit] = React.useState<Visit | null>(null);
    const service = usePatientService();

    React.useEffect(
        () => {
            if (loading) {
                service.getVisit(visitId!).then(async (v) => {
                    setVisit(v);
                    setPatient(await service.getPatientData(v!.patient_id));
                    setLoading(false);

                });
                service.getIllnesses().then((i) => {
                    setIllnesses(i);
                    setLoading(false);

                });
                service.getMedications().then((m) => {
                    setMedications(m);
                    setLoading(false);


                });
            }


        }
    );

    return (
        <div className='p-12 w-full'>
            <AppBreadcrumbs />

            {visit && patient && illnesses && medications ? (
                <div className='flex flex-col items-start justify-start w-full'>
                    <div className='flex flex-row items-center justify-start w-full border-b border-gray-300 mb-2 py-1'>
                        <h1 className='text-2xl font-semibold mr-auto'>
                            Visit Details
                        </h1>

                    </div>

                    <div className='  border border-gray-200 rounded-lg w-full p-6 bg-white mt-4 '>
                        <div className='flex flex-row gap-16'>
                            <div>
                                <div className='flex flex-row gap-8 border-b border-gray-300 mb-2 pb-2 items-center '>
                                    <h1 className='text-xl font-semibold '>
                                        Summary
                                    </h1>


                                </div>
                                <div className='flex flex-col gap-1'>
                                    <h2 >
                                        <span className='font-semibold'>Type:</span>                                         {capitalize(visit.type)} Visit

                                    </h2>
                                    <h2 className=''>
                                        <span className='font-semibold'>Date:</span> {dateFormat(visit.start_time, "mmmm dS, yyyy")}
                                    </h2>
                                    <h2 className=''>
                                        <span className='font-semibold'>Time:</span> {dateFormat(visit.start_time, "h:mm TT")}-{dateFormat(visit.end_time, "h:mm TT")}
                                    </h2>
                                </div>

                            </div>

                        </div>
                    </div>
                    <div className='  border border-gray-200 rounded-lg w-full p-6 bg-white mt-4 '>
                        <div className='flex flex-row gap-8 border-b border-gray-300 mb-4 pb-3 items-center '>
                            <h1 className='text-xl font-semibold '>
                                Diagnoses & Prescriptions
                            </h1>

                            <AddDiagnosisDialog />

                        </div>
                        <DiagnosisPoints visit={visit} />
                    </div>
                </div>


            ) : <></>}




        </div>
    );
}

