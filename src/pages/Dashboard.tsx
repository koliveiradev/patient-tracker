import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { MainLayout } from '../components/MainLayout';
import { Event } from '../models/Event';
import { EventsSchedule } from '../components/EventsSchedule';
import { useState, useEffect } from 'react';




const sampleEvents = [
    {
        id: 1,
        patient_id: 1,
        start_time: new Date('2021-10-01T10:00:00'),
        end_time: new Date('2021-10-01T11:00:00'),
        type: 'Appointment',
        doctor_id: 1,
        doctor_first_name: 'Sarah',
        doctor_last_name: 'Surgeon',
    } as Event,
    {
        id: 2,
        patient_id: 2,
        start_time: new Date('2021-10-02T10:00:00'),
        end_time: new Date('2021-10-02T11:00:00'),
        type: 'Random',
        doctor_id: 2,
        doctor_first_name: 'Daniel',
        doctor_last_name: 'Doctor',
    } as Event,
    {
        id: 3,
        patient_id: 3,
        start_time: new Date('2021-10-03T10:00:00'),
        end_time: new Date('2021-10-03T13:00:00'),
        type: 'Misc.',
        doctor_id: 3,
        doctor_first_name: 'Phyllis',
        doctor_last_name: 'Physician',
    } as Event,
];


const drawerWidth = 200;

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
}

interface Links {
    name: string;
    url: string;
    icon: React.ReactElement
}

export function DashboardPage(props: Props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [events, setEvents] = useState<Event[]>([]);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };


    useEffect(() => {
        setEvents(sampleEvents);
        console.log("set events");
    }, []);



    return <>
        <EventsSchedule events={events}/>
    </>;

}




