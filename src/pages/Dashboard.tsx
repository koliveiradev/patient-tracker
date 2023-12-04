import * as React from 'react';
import { Event } from '../models/Event';
import { EventsSchedule } from '../components/EventsSchedule';
import { useState, useEffect } from 'react';
import { usePatientService } from '../services/Patient';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';




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
    const [loading, setLoading] = useState<boolean>(true);
    const [userId, setUserId] = useState<string | null>(null);


    

    const service = usePatientService();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };


    useEffect(
    () => {
        if (loading) {
            service.getLoggedInPatient().then((patient) => {
                setUserId(patient);                
                service.getUpcomingEvents(patient!).then((events) => {
                    setEvents(events);
                    console.log("events", events);
                    setLoading(false);
                });
                
            });
        }
    }, []
    );

    



    return <>
        <div className="p-8 h-screen w-full">
            <div>
                <h1 className='text-2xl font-semibold'>Dashboard</h1>
                <div className='border-b border-gray-300 w-full mb-8 mt-4' />
            </div>
            {loading ? 
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
                : 
                <EventsSchedule events={events!}/>
            }
        </div>;
    </>

}




