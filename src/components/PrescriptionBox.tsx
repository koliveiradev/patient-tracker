import * as React from 'react';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MedicationIcon from '@mui/icons-material/Medication';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

interface PrescriptionBoxProps {
    prescriptions: Prescription[];
}

export interface Prescription {
  name: string;
  id: number;
  prescribedOn: string
}

export function PrescriptionBox(prescriptionList: PrescriptionBoxProps) {
  return (<>
    <div className='  border border-gray-200 rounded-lg w-full p-4 bg-white mt-8 '>
    <div className='flex flex-row gap-8 border-b border-gray-300 mb-4 pb-3 items-center '>
        <h1 className='text-xl font-semibold '>
            Prescriptions
        </h1>
    </div>
        {prescriptionList.prescriptions.length === 0 ? (
          <>You have no prescriptions.</>
        ) : (
          <List>
            {prescriptionList.prescriptions.map((prescription: Prescription) => (
              <ListItem key={prescription.id}>
                <ListItemIcon>
                  <FiberManualRecordIcon sx={{ fontSize: 'small' }} />
                </ListItemIcon>
                <ListItemText primary={prescription.name} secondary={`Prescribed on ${prescription.prescribedOn}`} />
              </ListItem>
            ))}
          </List>
        )}
    </div>
    </>
  );
};
