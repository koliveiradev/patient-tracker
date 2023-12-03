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
import { Patient } from '../models/Patient';
import { getAge } from '../util/dates';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { CloseOutlined } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { usePatientService } from '../services/Patient';
import { AppBreadcrumbs } from '../components/BreadCrumbs';
import LeftAlignedTimeline from '../components/MedicalHistory';
import { DatePicker, DateTimePicker, MobileDateTimePicker, TimePicker } from '@mui/x-date-pickers';


export default function PatientPage(props: any) {
    let { patientId } = useParams();
    const [patient, setPatient] = React.useState<Patient | null>(null);
    const [loading, setLoading] = React.useState<boolean>(true);
    const service = usePatientService();
    const handleSetPatient = (patient: Patient | null) => {
        setPatient(patient);
    }
    React.useEffect(
        () => {
            if (loading) {
                service.getPatientData(patientId!).then((p) => {

                    setPatient(p);
                    setLoading(false);
                    console.log(p);
                });
            }


        }
    );
    return (
        <div className='p-12 w-full'>
            <AppBreadcrumbs />

            {patient !== null ? (
                <div className='flex flex-col items-start justify-start w-full'>
                    <div className='flex flex-row items-center justify-start w-full border-b border-gray-300 mb-4 py-1'>
                        <h1 className='text-2xl font-semibold mr-auto'>
                            Patient Summary
                        </h1>

                    </div>

                    <div className='  border border-gray-200 rounded-lg w-full p-4 bg-white mt-8 '>
                        <div className='flex flex-row gap-8 border-b border-gray-300 mb-4 pb-3 items-center '>
                            <h1 className='text-xl font-semibold '>
                                {patient.first_name} {patient.last_name}
                            </h1>


                        </div>
                        <h2 className='text-sm mt-2'>
                            <span className='font-semibold'>Age:</span> {getAge(patient.birth)}
                        </h2>
                        <h2 className='text-sm'>
                            <span className='font-semibold'>Sex:</span> {patient.sex}
                        </h2>
                    </div>
                    <div className='  border border-gray-200 rounded-lg w-full p-4 bg-white mt-8 '>
                        <div className='flex flex-row gap-8 border-b border-gray-300 mb-4 pb-3 items-center '>
                            <h1 className='text-xl font-semibold '>
                                Medical History
                            </h1>

                            <FormDialog />

                        </div>
                        <LeftAlignedTimeline />
                    </div>
                </div>


            ) : <></>}




        </div>
    );
}

export function FormDialog() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        // setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>

            <button onClick={handleClickOpen} className="bg-primary bg-opacity-90 text-white text-sm shadow-sm font-semibold py-2 px-4 rounded-lg" >
                + Add Event
            </button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Event</DialogTitle>
                <DialogContent>

                    <TextField
                        autoFocus
                        margin="dense"
                        size='small'
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="outlined"
                    />
                    <MobileDateTimePicker label="Event Date Time" className='w-full' orientation="landscape" />
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Age</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={10}
                            label="Age"
                            onChange={(age) => {

                            }}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>


                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose} variant='contained'>Subscribe</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}