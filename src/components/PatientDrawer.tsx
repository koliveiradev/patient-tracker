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
import { IconButton } from '@mui/material';
import { CloseOutlined } from '@mui/icons-material';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function PatientDrawer(props: { patient: Patient | null, setPatient: (patient: Patient | null) => void }) {

    const toggleDrawer =
        (open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                props.setPatient(null);

            };




    return (
        <div>

            <Drawer
                anchor={'right'}
                open={props.patient !== null}
                onClose={toggleDrawer(false)}
                elevation={2}
                transitionDuration={500}
                variant="persistent"            >
                <div className='w-96 h-full p-8 border-l border-gray-300'>

                    {props.patient !== null ? (
                        <div className='flex flex-col items-start justify-start'>
                            <div className='flex flex-row items-center justify-start w-full border-b border-gray-300 mb-4 py-1'>
                                <h1 className='text-2xl font-semibold mr-auto'>
                                    Patient
                                </h1>
                                <IconButton onClick={toggleDrawer(false)} >
                                    <CloseOutlined />
                                </IconButton>
                            </div>
                            <h1 className='text-xl font-medium'>
                                {props.patient!.first_name} {props.patient?.last_name}
                            </h1>
                            <h2 className='text-sm mt-2'>
                                <span className='font-semibold'>Age:</span> {getAge(props.patient?.birth)}
                            </h2>
                            <h2 className='text-sm'>
                                <span className='font-semibold'>Sex:</span> {props.patient.sex}
                            </h2>

                        </div>

                    ) : <></>}



                </div>
            </Drawer>
        </div>
    );
}