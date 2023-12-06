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
import { Button, IconButton } from '@mui/material';
import { Visit } from '../models/Visit';
import dateFormat from 'dateformat';
import { capitialize } from '../util/Text';
import { useNavigate } from 'react-router-dom';
import { Delete, DeleteOutline, Edit, EditAttributes, EditOutlined } from '@mui/icons-material';
import { AddDiagnosisDialog, DiagnosisSubmitForm } from './AddDiagnosisDialog';

export default function DiagnosisPoints(props: { visit: Visit, onDelete: (id: number) => void }) {




    const handleDelete = (id: number) => {
        props.onDelete(id);
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
            {props.visit.diagnoses.map((diagnosis) => {
                return <TimelineItem key={diagnosis.id}>


                    <TimelineSeparator>
                        <TimelineDot variant="outlined" />
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                        <div className='flex flex-row justify-between items-start'>


                            <div>
                                <div className='font-semibold'>
                                    {capitialize(diagnosis.illness.name)}

                                </div>
                                {
                                    diagnosis.prescriptions.slice(0, 1).map((p) => {
                                        return <div><div className='font-medium text-sm'>
                                        </div>
                                            <div className='mb-1'>

                                                {
                                                    new Date(p.end_date) > new Date() ? <div className='font-semibold text-sm text-indigo-500'>
                                                        <span className='text-gray-500'>{p.medication.name} | </span> Active
                                                    </div> : <div className='font-semibold text-sm text-teal-500'>
                                                        <span className='text-gray-500'>{p.medication.name} | </span>Completed

                                                    </div>
                                                }
                                            </div>
                                            <div className='font-medium text-sm'>
                                                {dateFormat(p.start_date, 'mmmm dS, yyyy')}

                                            </div>
                                            <div className='font-medium text-sm'>
                                                {dateFormat(p.start_date, 'h:MM TT')}- {dateFormat(p.start_date, 'h:MM TT')}

                                            </div>
                                        </div>
                                    })
                                }

                            </div>
                            <div>

                                <IconButton aria-label="delete" color='error' onClick={() => handleDelete(diagnosis.id)}>
                                    <DeleteOutline />
                                </IconButton>
                            </div>
                        </div>
                    </TimelineContent>
                </TimelineItem>
            })}





        </Timeline>

    );
}
