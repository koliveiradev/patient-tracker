import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent, {
    timelineOppositeContentClasses,
} from '@mui/lab/TimelineOppositeContent';
import { Button } from '@mui/material';
import { Visit } from '../models/Visit';
import dateFormat from 'dateformat';
import { capitialize } from '../util/Text';
import { useNavigate } from 'react-router-dom';

export default function VisistTimeline(props: { visits: Visit[] }) {

    const navigate = useNavigate();

    const viewVisit = (visit: Visit) => {
        navigate(`/visits/${visit.id}`);
    }

    return (
        <Timeline
            sx={{
                [`& .${timelineItemClasses.root}:before`]: {
                    flex: 0,
                    padding: 0,
                },
            }}
        >
            {props.visits.map((visit) => {
                return <TimelineItem key={visit.id}>


                    <TimelineSeparator>
                        <TimelineDot variant="outlined" />
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                        <div className='flex flex-row gap-16'>
                            <div>
                                <div className='font-semibold'>
                                    {capitialize(visit.type)} Visit
                                </div>
                                <div className='mb-1'>
                                    {
                                        new Date(visit.end_time) > new Date() ? <div className='font-semibold text-sm text-indigo-500'>
                                            Upcoming
                                        </div> : <div className='font-semibold text-sm text-teal-500'>
                                            Completed
                                        </div>
                                    }
                                </div>
                                <div className='font-medium text-sm'>
                                    {dateFormat(visit.start_time, 'mmmm dS, yyyy')}

                                </div>
                                <div className='font-medium text-sm'>
                                    {dateFormat(visit.start_time, 'h:MM TT')}- {dateFormat(visit.end_time, 'h:MM TT')}

                                </div>
                                <div className='font-semibold underline cursor-pointer text-sm text-primary mt-2' onClick={() => viewVisit(visit)}>
                                    View More
                                </div>

                            </div>
                            <div>
                                <div className='font-semibold'>
                                    Diagnoses
                                </div>
                                {
                                    visit.diagnoses.map((diagnosis) => {
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
                                    visit.diagnoses.map((d) => d.prescriptions).flat().map((p) => {
                                        return <div className='font-medium text-sm'>
                                            • {p.medication.name}
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    </TimelineContent>
                </TimelineItem>
            })}





        </Timeline>
    );
}
