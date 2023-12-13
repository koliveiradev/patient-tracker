
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Patient } from '../models/Patient';
import { usePatientService } from '../services/Patient';
import { Visit } from '../models/Visit';
import { capitalize } from '@mui/material';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';


const localizer = momentLocalizer(moment)
export function SchedulePage(props: any) {
    const [loading, setLoading] = useState<boolean>(true);
    const [visits, setVisits] = useState<Visit[]>([]); // [1
    const service = usePatientService();
    const navigate = useNavigate();

    const handleSetPatient = (patient: Patient) => {
        navigate("/patients/" + patient.id);

    }
    useEffect(
        () => {
            if (loading) {
                service.getVisits().then((visits: Visit[]) => {
                    setVisits(visits);
                    setLoading(false);
                });
            }


        }
    );
    const events = visits.map((v: any) => {
        return {

            start: v.start_time,
            end: v.end_time,
            allDay: false,
            title: v.patient.first_name + " " + v.patient.last_name + " | " + capitalize(v.type),
        }
    });
    return <main className='h-screen p-8 w-full flex flex-col'>
        <div>
            <h1 className='text-2xl font-semibold'>Schedule</h1>
            <div className='border-b border-gray-300 w-full mb-8 mt-4' />
        </div>
        <div className='shadow border border-gray-300 rounded-lg p-1 bg-white w-full  grow-1'>

            <Calendar
                localizer={localizer}
                defaultDate={new Date()}
                popup={false}

                events={events}
                views={['month']}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '600px' }}
            />
        </div>
    </main>;

}



